import Book from '../models/bookModel.js';

const addBookController = async (req, res) => {
    const role = req.session.role; // Fetch role from session
    console.log("Role of user from the addBookController: ", role);

    if (req.method === 'GET') {
        // Pass the role to the EJS template when rendering
        return res.render('addBook', { role }); // Pass role here
    }

    if (req.method === 'POST') {
        try {
            const { bookName, author, genre, isbn, copies } = req.body;

            // Check if the file is available
            if (!req.file) {
                return res.status(400).send("Cover image is required.");
            }

            // Create a new book document
            const newBook = new Book({
                bookName,
                bookAuthor: author,
                genre,
                ISBN: isbn,
                copies,
                coverImage: {
                    data: req.file.buffer, // For storing file as binary
                    contentType: req.file.mimetype, // MIME type (e.g., 'image/png')
                },
            });

            const savedBook = await newBook.save();
            if (savedBook) {
                // Redirect or render a page after book is saved
                res.render('books', { book: savedBook, role }); // Pass role here
            }
            res.status(201).send({ message: "Book added successfully", book: savedBook });
        } catch (error) {
            console.error("Error saving book:", error);
            res.status(500).send("Failed to add book.");
        }
    }
};

export { addBookController };
