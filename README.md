

![Screenshot 2025-01-16 at 5 50 39 PM](https://github.com/user-attachments/assets/296c2815-f2dc-4c8e-8909-d5d7e889e61b)
# Readme 

# LibCloud - AI-Powered Library Management System

# Screenshots

<img width="1470" alt="Screenshot 2025-01-16 at 9 11 49 AM" src="https://github.com/user-attachments/assets/251ee532-a0dd-4000-a6e2-9fe527db89bc" />
<img width="1470" alt="Screenshot 2025-01-16 at 5 52 30 PM" src="https://github.com/user-attachments/assets/c2bdce7b-9a68-4341-bec9-9aa39eda6be9" />
<img width="1470" alt="Screenshot 2025-01-16 at 5 52 28 PM" src="https://github.com/user-attachments/assets/8cb63d02-136b-4085-93f9-8328485b7ce5" />
<img width="1470" alt="Screenshot 2025-01-16 at 5 52 26 PM" src="https://github.com/user-attachments/assets/8e900ba4-8dbb-417f-be10-147059eaddf7" />
<img width="1470" alt="Screenshot 2025-01-16 at 5 52 23 PM" src="https://github.com/user-attachments/assets/a9272007-c0c0-4f60-bd0e-42648b30fe0e" />
<img width="1470" alt="Screenshot 2025-01-16 at 5 51 54 PM" src="https://github.com/user-attachments/assets/a27669f1-16cf-4ef8-bbf9-d4ecd65bdc6b" />
<img width="1470" alt="Screenshot 2025-01-16 at 5 51 23 PM" src="https://github.com/user-attachments/assets/15d79d6a-9a2c-48d5-a69b-c97354ddb834" />
<img width="1470" alt="Screenshot 2025-01-16 at 5 51 13 PM" src="https://github.com/user-attachments/assets/45c70d10-6f4a-4c1f-a57e-59286af55896" />
<img width="1470" alt="Screenshot 2025-01-16 at 5 51 02 PM" src="https://github.com/user-attachments/assets/06f95d7c-8775-4039-a6e0-a8116f1f1a21" />
<img width="1470" alt="Screenshot 2025-01-16 at 5 50 50 PM" src="https://github.com/user-attachments/assets/7449c8f7-0bf2-4464-ad6a-f3f5b28c15d8" />

## Overview

Welcome to LibCloud, an innovative library management system that integrates artificial intelligence to enhance user experience. This system allows users to chat with eBooks and PDFs using the ChatPDF API, enabling real-time interaction and efficient book management. The platform is powered by MongoDB for database management and uses EJS as the template engine for rendering dynamic web pages.

## Features

AI Integration: Chat with eBooks and PDFs for real-time assistance and information retrieval.

Efficient Book Issue/Return: Simplified workflows for managing book transactions.

Dynamic Web Pages: Powered by EJS for a seamless and responsive user interface.

Robust Database: Uses MongoDB to handle all library data efficiently.

## Prerequisites

Before running the application, ensure the following are installed on your system:

Node.js: Download Node.js

MongoDB: Download MongoDB

ChatPDF API Key: Obtain an API key from ChatPDF.

## Installation Guide

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

npm run dev

The application will be accessible at http://localhost:3000.

## Usage

Access the System: Open the application in your web browser.

Chat with eBooks: Upload a PDF and start interacting with it using the AI-powered chat feature.

Manage Books: Use the intuitive interface to issue or return books.

## Dependencies

The following key libraries and frameworks are used in this project:

Express.js: Web application framework.

EJS: Template engine for rendering dynamic web pages.

MongoDB: Database for storing library data.

ChatPDF API: For AI-driven interaction with eBooks and PDFs.

Install these packages using:

npm install express ejs mongoose dotenv

## Folder Structure

LibCloud/
├── public/            # Static files (CSS, JS, images)
├── views/             # EJS templates
├── routes/            # Application routes
├── models/            # MongoDB schemas
├── controllers/       # Application logic
├── .env               # Environment variables
├── app.js             # Main application file
└── package.json       # Project metadata and dependencies

## Contributions

We welcome contributions to enhance LibCloud. Feel free to fork the repository and submit pull requests.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Support

If you encounter any issues or have questions, please open an issue in the repository or contact the development team.

Enjoy using LibCloud for a smarter library experience!
