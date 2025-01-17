import mongoose from 'mongoose';

// Define the schema for the fine record
const borrowedBook = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book', // Assuming you have a Book model
    required: true
  },
  borrowedDate: {
    type: Date,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  returnDate: {
    type: Date
  },
  fineAmount: {
    type: Number,
    required: true
  },
  fineReason: {
    type: String,
    default: " "
  }
});

// Create a model for the borrowedBook schema   
const BorrowedBook = mongoose.model('BorrowedBook', borrowedBook);

export default BorrowedBook;


