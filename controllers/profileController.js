import userModel from "../models/userModel.js";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

// Display user profile
export const profileController = async (req, res) => {
    try {
        // Ensure session has a valid userId
        const userId = req.session.userId;
        const role = req.session.role;
        console.log(userId);
        if (!userId) {
            return res.status(401).render('error', { message: 'Unauthorized access' });
        }

        // Query the database for the user
        const user = await userModel.findOne({userId });

        // Check if the user exists
        if (!user) {
            return res.status(404).render('error', { message: 'User not found' });
        }

        // Render the profile page with the user data
        res.render('profile', { user, role  });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).render('error', { message: 'Internal Server Error' });
    }
};


export const updateProfileController = async (req, res) => {
    try {
        const { email, password } = req.body;  // Extract input from the request body
        const userId = req.session.userId;     // Assuming userId is stored in the session

        // Ensure the userId is a valid number and query the database
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        // Prepare the update fields
        const updateFields = {};
        if (email) updateFields.email = email;
        if (password) updateFields.password = password;

        // Query the database using the `userId` as the filter
        const updatedUser = await userModel.findOneAndUpdate(
            { userId: userId },  // Assuming the `userId` is a field in your model (e.g., `userId: 7`)
            updateFields,         // Fields to update
            { new: true }         // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Send the response with the updated user
        res.json({
            success: true,
            message: "User profile updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        // Handle errors
        console.error("Update Error:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const deleteProfileController = async (req, res) => {
    try {
        const userId = req.session.userId; // Assuming the userId is stored in the session

        // Ensure userId exists and is valid
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        // Delete the user based on the userId
        const deletedUser = await userModel.findOneAndDelete({ userId: userId });

        if (!deletedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Send response indicating successful deletion
        res.json({
            success: true,
            message: "User profile deleted successfully",
        });
    } catch (error) {
        // Handle errors
        console.error("Delete Error:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};