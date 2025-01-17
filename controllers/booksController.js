import Book from '../models/bookModel.js'; // Adjust the path if needed

const booksController = async (req, res) => {
    try {
        const books = await Book.find();
        
        res.render('books', { books });
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).send('Internal Server Error');
    }
};

export { booksController };
