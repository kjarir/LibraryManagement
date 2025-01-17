# Readme 

LibCloud - AI-Powered Library Management System

Overview

Welcome to LibCloud, an innovative library management system that integrates artificial intelligence to enhance user experience. This system allows users to chat with eBooks and PDFs using the ChatPDF API, enabling real-time interaction and efficient book management. The platform is powered by MongoDB for database management and uses EJS as the template engine for rendering dynamic web pages.

Features

AI Integration: Chat with eBooks and PDFs for real-time assistance and information retrieval.

Efficient Book Issue/Return: Simplified workflows for managing book transactions.

Dynamic Web Pages: Powered by EJS for a seamless and responsive user interface.

Robust Database: Uses MongoDB to handle all library data efficiently.

Prerequisites

Before running the application, ensure the following are installed on your system:

Node.js: Download Node.js

MongoDB: Download MongoDB

ChatPDF API Key: Obtain an API key from ChatPDF.

Installation Guide

Follow these steps to set up and run the LibCloud system:

Step 1: Clone the Repository

git clone <repository-url>
cd <repository-folder>

Step 2: Install Dependencies

Run the following command to install required packages:

npm install

Step 3: Configure Environment Variables

Create a .env file in the root directory and add the following variables:

MONGO_URI=your-mongodb-connection-string
CHATPDF_API_KEY=your-chatpdf-api-key
PORT=3000

Step 4: Run the Application

Start the development server using:

npm start

The application will be accessible at http://localhost:3000.

Usage

Access the System: Open the application in your web browser.

Chat with eBooks: Upload a PDF and start interacting with it using the AI-powered chat feature.

Manage Books: Use the intuitive interface to issue or return books.

Dependencies

The following key libraries and frameworks are used in this project:

Express.js: Web application framework.

EJS: Template engine for rendering dynamic web pages.

MongoDB: Database for storing library data.

ChatPDF API: For AI-driven interaction with eBooks and PDFs.

Install these packages using:

npm install express ejs mongoose dotenv

Folder Structure

LibCloud/
├── public/            # Static files (CSS, JS, images)
├── views/             # EJS templates
├── routes/            # Application routes
├── models/            # MongoDB schemas
├── controllers/       # Application logic
├── .env               # Environment variables
├── app.js             # Main application file
└── package.json       # Project metadata and dependencies

Contributions

We welcome contributions to enhance LibCloud. Feel free to fork the repository and submit pull requests.

License

This project is licensed under the MIT License. See the LICENSE file for details.

Support

If you encounter any issues or have questions, please open an issue in the repository or contact the development team.

Enjoy using LibCloud for a smarter library experience!