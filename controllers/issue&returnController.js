import Book from '../models/bookModel.js';
import User from '../models/userModel.js';
import BorrowedBook from '../models/borrowedBookModel.js';

// borrow route in your controller

export const borrowBook = async (req, res) => {
    try {
        const { userId, bookId } = req.body; // Get userId and bookId from request body
        console.log('User ID:', userId, 'Book ID:', bookId); // Log to verify values

        // Validate userId
        if (isNaN(userId)) {
            return res.status(400).json({ message: "Invalid User ID format" });
        }

        // Find the user
        const user = await User.findOne({ userId: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find the book
        const book = await Book.findById(bookId);
        console.log(book); // Log to verify book details
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        // Check if there are available copies
        if (book.copies <= 0) {
            return res.status(400).json({ message: "No available copies of the book" });
        }

        // Set due date to 14 days from now
        const borrowedDate = new Date();
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 14);

        // Check for overdue books and apply fine if necessary
        const overdueBook = book.issuedTo.find(issued => {
            const dueDate = new Date(issued.dueDate);
            return dueDate < new Date();
        });

        let fineAmount = 0;

        if (overdueBook) {
            fineAmount = 50; // Example fine amount
            fineReason = 'Late Submission';

            // Add fine to user
            user.fines.push({
                amount: fineAmount,
                reason: fineReason,
                dateIssued: new Date()
            });
            await user.save();
        }

        // Add entry to BorrowedBook collection
        const borrowedBookEntry = new BorrowedBook({
            userId: user._id,
            bookId: book._id,
            borrowedDate: borrowedDate,
            dueDate: dueDate,
            returnDate: null, // Not returned yet
            fineAmount: fineAmount,
        });

        await borrowedBookEntry.save();

        // Update Book Copies and IssuedTo
        book.issuedTo.push({ userId: user._id, dueDate: dueDate });
        book.copies -= 1;
        await book.save();

        res.status(200).json({
            message: "Book borrowed successfully",
            borrowedBook: borrowedBookEntry
        });

    } catch (error) {
        console.error("Borrow Book Error:", error);
        res.status(500).json({ message: "An error occurred while borrowing the book" });
    }
};


