import borrowedBook from '../models/borrowedBookModel.js';

export const fineController = async (req, res) => {
    const role = req.session.role;
    try {
        const borrowedBooks = await borrowedBook.find()
            .populate('userId') // Populates user details if needed
            .populate('bookId'); // Populates book details

        // Map data for rendering
        const booksWithFineDetails = borrowedBooks.map(book => ({
            bookName: book.bookId?.bookName || 'N/A', // Assuming 'name' is the book title field
            borrowedDate: book.borrowedDate?.toLocaleDateString() || 'N/A',
            dueDate: book.dueDate?.toLocaleDateString() || 'N/A',
            returnDate: book.returnDate?.toLocaleDateString() || 'N/A',
            fineAmount: book.fineAmount ? `₹${book.fineAmount}` : 'N/A'
        }));

        res.render('fine', { books: booksWithFineDetails, role });
    } catch (error) {
        console.error('Error fetching fine details:', error);
        res.status(500).send('Internal Server Error');
    }
};
