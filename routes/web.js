import express from 'express';
import Book from '../models/bookModel.js';

import { upload } from '../multerConfig.js';
import { checkSession } from './sessionMiddleware.js';
import { borrowBook } from '../controllers/issue&returnController.js';
import { signupController } from '../controllers/signupController.js';
import { createDoc } from '../controllers/signupController.js';
import { homeController } from '../controllers/homeController.js';
import { booksController } from '../controllers/booksController.js';
import { getEbooks } from '../controllers/ebooksController.js';
import { addBookController } from '../controllers/addBookController.js';
import { addEbookController } from '../controllers/addEbookController.js';
import { userController, issueFine } from '../controllers/userController.js';
import { loginController } from '../controllers/loginController.js';
import { adminHomeController } from '../controllers/adminHomeController.js';
import { viewPDFController } from '../controllers/viewPDFController.js';
import { uploadPdfToChatPDF } from '../controllers/ebooksController.js';
import { chatWithPDF } from '../controllers/viewPDFController.js';
import { fineController } from '../controllers/fineController.js';
import { returnBook } from '../controllers/userController.js';
import { profileController } from '../controllers/profileController.js';
import { updateProfileController } from '../controllers/profileController.js';
import { deleteProfileController } from '../controllers/profileController.js';
const router = express.Router();

// User routes
router.get('/signup', signupController);
router.post('/signup', createDoc);
router.get('/login', loginController);
router.post('/login', loginController);

// Home routes based on role
router.get('/home',  checkSession, (req, res) => {
    const role = req.session.role;
    if (role === 'admin') {
        return res.render('adminHome', { role });
    } else {
        return res.render('home', { role });
    }
});

// Book routes
router.get('/books', checkSession, async (req, res) => {
    try {
        const books = await Book.find();
        const role = req.session.role;
        const userId = req.session.userId;
        res.render('books', { books, role, userId });
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).send('Error fetching books');
    }
});

//Book routes
router.post('/addBook', upload.single('coverImage'), addBookController);
router.get('/addBook', addBookController);

// eBook routes
router.get('/ebooks', getEbooks);
router.get('/eBooks', checkSession, (req, res) => res.render('ebooks'));
router.get('/addEbook', addEbookController);
router.post('/addEbook', upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'bookPDF', maxCount: 1 }
]), addEbookController);
router.post('/uploadPdfToChatPDF/:id', uploadPdfToChatPDF);

//View PDF routes
router.get('/viewPDF/:id', viewPDFController);
router.post('/chatWithPDF', chatWithPDF);

// User routes
router.get('/users', userController);

// Borrow routes
router.post('/borrow/:bookId', borrowBook);

//Fine routes
router.post('/users/issueFine/:userId', issueFine); // New route for issuing fine
router.get('/fines', fineController);

//Book return routes
router.post('/users/returnBook/:userId/:bookId', returnBook);

//logout route
router.get('/logout',  (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.redirect('/dashboard'); // Redirect to a safe fallback
        }
        res.redirect('/login'); // Redirect to the login page
    });
});

router.get('/profile', profileController);
router.post('/profile', updateProfileController);
router.post('/deleteProfile', deleteProfileController);

export default router;
