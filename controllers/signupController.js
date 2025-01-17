import { join } from 'path';
import UserModel from '../models/userModel.js';

const signupController = (req, res) => {
    res.render('signup'); // Render the 'signup.ejs' file without specifying the full path
};

const createDoc = async (req, res) => {
    try {
        const { email,number, password } = req.body;

        // Check if the email already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already taken. Please use a different email." });
        }

        const doc = new UserModel({
            email,
            number,
            password,
        });

        await doc.save();
        if(res.status(200)){
            res.redirect('/home');
        } else {
            res.status(500).json({ error: "Internal Server Error. Please try again later." });
        }
    
    } catch (error) {
        console.error("Error saving document:", error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: "Invalid input. Please check your details and try again." });
        }

        res.status(500).json({ error: "Internal Server Error. Please try again later." });
    }
};

export { signupController, createDoc };
