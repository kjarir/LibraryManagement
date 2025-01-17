import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import web from './routes/web.js';
import session from 'express-session';
import MongoStore from 'connect-mongo'; // Session store using MongoDB (recommended)


const app = express();
const port = 3000;

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'public')));

// Session setup
app.use(
    session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: false, // Prevent saving empty sessions
        store: MongoStore.create({ 
            mongoUrl: 'mongodb://localhost:27017/', // Add your MongoDB connection string here
            ttl: 24 * 60 * 60 // Session timeout in seconds (1 day)
        }),
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set to true in production if using HTTPS
            maxAge: 24 * 60 * 60 * 1000, // Session duration (1 day)
            sameSite: 'strict', // Prevents cross-site request forgery
        },
        rolling: true, // Resets session expiration time with every request
    })
);

// Routes
app.use('/', web);

// Connect to MongoDB
async function connectDB() {
    try {
        await mongoose.connect("mongodb://localhost:27017/", {
            dbName: "LibraryDB",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to database");
    } catch (err) {
        console.error("Error connecting to database: ", err);
        process.exit(1); // Exit process on failure
    }
}
connectDB();

// Error Handling
app.use((req, res, next) => {
    res.status(404).render('404', { message: 'Page not found!' });
});

// General error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { message: 'Something went wrong!' });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
