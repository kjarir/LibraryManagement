import userModel from '../models/userModel.js';
import BorrowedBook from '../models/borrowedBookModel.js';
import Book from '../models/bookModel.js';
import UserModel from '../models/userModel.js';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

const userController = async (req, res) => {
    const role = req.session.role;
    try {
        // Fetch all users and their borrowed books
        const users = await userModel.find();
        const books = await Book.find();
        const borrowedBooks = await BorrowedBook.find().populate('userId').populate('bookId');

        // Map borrowed books to respective users
        // Map borrowed books to respective users
        const userBorrowedBooks = {};
        borrowedBooks.forEach(borrow => {
            const userId = borrow.userId._id.toString(); // Ensure userId is a string
            if (!userBorrowedBooks[userId]) {
                userBorrowedBooks[userId] = [];
            }
            userBorrowedBooks[userId].push({
                bookId: borrow.bookId?._id.toString() || null, // Include bookId
                bookName: borrow.bookId?.bookName || 'Unknown Book',
                borrowDate: borrow.borrowedDate?.toLocaleDateString() || 'N/A',
                returnDate: borrow.returnDate?.toLocaleDateString() || 'N/A',
                dueDate: borrow.dueDate?.toLocaleDateString() || 'N/A',
            });
        });


        // Add borrowed books and fine sum to each user
        users.forEach(user => {
            user.fineSum = user.fines
                .map(fine => Number(fine)) // Convert each fine to a number
                .reduce((sum, fine) => sum + fine, 0); // Sum fines

            user.borrowedBooks = userBorrowedBooks[user._id.toString()] || [];
        });

        res.render('user', { users, books, role });
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to fetch user data');
    }
};

const issueFine = async (req, res) => {
    const { userId } = req.params;
    const { fine } = req.body;
    const fineReason = req.body.fineReson;

    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.fines.push(Number(fine)); // Add fine to user's fines array
        await user.save();

        res.status(200).json({ message: 'Fine issued successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to issue fine' });
    }
};


const returnBook = async (req, res) => {
    const { userId, bookId } = req.params;

    try {
        // Find the borrowed record
        const borrowedRecord = await BorrowedBook.findOne({ userId, bookId });
        if (!borrowedRecord) {
            return res.status(404).json({ message: 'Borrowed record not found' });
        }

        // Remove the borrowed record
        await BorrowedBook.deleteOne({ _id: borrowedRecord._id });

        // Update the book's available copies
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        book.copies += 1;
        await book.save();

        res.status(200).json({ message: 'Book returned successfully' });
    } catch (err) {
        console.error('Error in returnBook:', err);
        res.status(500).json({ message: 'Failed to return book' });
    }
};





export { userController, issueFine, returnBook };
