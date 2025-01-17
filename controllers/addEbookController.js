import { application } from "express";
import eBook from "../models/ebookModel.js";
import fs from 'fs';

const addEbookController = async (req, res) => {
    const role = req.session.role;
    if (req.method === 'GET') {
        // Render the addEbook form
        return res.render('addEbook', { role });
    }

    if (req.method === 'POST') {
        try {
            const { bookName, bookAuthor, genre, ISBN, copies } = req.body;

            // Check if ISBN is missing
            if (!ISBN) {
                return res.status(400).send("ISBN is required.");
            }

            // Validate uploaded files
            if (!req.files || !req.files.coverImage || !req.files.bookPDF) {
                return res.status(400).send("Cover image and eBook PDF are required.");
            }

            // Create a new eBook document
            const newEbook = new eBook({
                bookName,
                bookAuthor,
                genre,
                ISBN,
                copies,
                coverImage: {
                    data: req.files.coverImage[0].buffer, // Access binary data
                    contentType: req.files.coverImage[0].mimetype, // MIME type
                },
                bookPDF: {
                    data: req.files.bookPDF[0].buffer, // Access binary data
                    contentType: req.files.bookPDF[0].mimetype, // MIME type
                },
            });

            // Save the new eBook
            const savedEbook = await newEbook.save();
            res.status(201).send({ message: "eBook added successfully", ebook: savedEbook });
        } catch (error) {
            console.error("Error saving eBook:", error);
            res.status(500).send("Failed to add eBook.");
        }
    }
};



export { addEbookController };
