import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

// Initialize the plugin with the mongoose instance
const AutoIncrement = AutoIncrementFactory(mongoose);

const bookSchema = new mongoose.Schema(
    {
        bookId: {
            type: Number,
            unique: true, // Ensures bookId is unique
        },
        bookName: {
            type: String,
            required: true,
            trim: true, // Removes leading/trailing spaces
        },
        bookAuthor: {
            type: String,
            required: true,
            trim: true,
        },
        coverImage: {
            data: Buffer,
            contentType: String,
        },
        genre: {
            type: String,
            required: true,
            trim: true,
        },
        ISBN: {
            type: String,
            required: true,
        },
        copies: {
            type: Number,
            required: true,
            default: 1,
            min: 0, // Ensures copies can't be negative
        },
        issuedTo: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User", // Reference to the User model
                    required: true,
                },
                dueDate: {
                    type: Date,
                    required: true,
                },
            },
        ],
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
        collection: "Book", // Explicit collection name
    }
);

// Auto-increment plugin for bookId
bookSchema.plugin(AutoIncrement, { inc_field: "bookId", start_seq: 1 });

// Export the Book model
const Book = mongoose.model("Book", bookSchema);

export default Book;
