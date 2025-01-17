import mongoose from 'mongoose';

const eBookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true,
    },
    bookAuthor: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    ISBN: {
        type: String,
        required: true,
    },
    copies: {
        type: Number,
        required: true,
    },
    coverImage: {
        data: Buffer, // Store image as binary data
        contentType: String, // MIME type of the image
    },
    bookPDF: {
        data: Buffer, // Store PDF as binary data
        contentType: String, // MIME type of the PDF
    },
    sourceId: { 
        type: String
    }
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

const eBook = mongoose.model('eBook', eBookSchema);

export default eBook;
