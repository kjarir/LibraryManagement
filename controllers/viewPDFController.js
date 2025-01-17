import eBook from '../models/ebookModel.js'; // Import the model
import fetch from 'node-fetch';
import FormData from 'form-data'; // Correct import
import Book from '../models/bookModel.js';
import fs from 'fs';
import path from 'path';
import os from 'os';

const CHATPDF_API_KEY = 'sec_341Ff7OXkzYyI9V2d42KIEhNGcx0iyHf';


const viewPDFController = async (req, res) => {
  const { id } = req.params;

  if (req.method === 'GET') {
    console.log('GET target hit');
    const sourceId = req.session.sourceId;
    console.log('Source ID from viewPDF:', sourceId);

    try {
      // Fetch PDF document from the database
      const pdfDocument = await eBook.findById(id);
      if (!pdfDocument) {
        return res.status(404).send('PDF not found');
      }

      // Convert binary PDF data to Base64 string
      const base64Pdf = pdfDocument.bookPDF.data.toString('base64');

      // Retrieve sourceId from session (if available)
        // Pass Base64 string, book name, and sourceId to the EJS template
      res.render('viewPDF', {
        base64Pdf,
        bookName: pdfDocument.bookName,
        sourceId: req.session.sourceId,
      });
    } catch (error) {
      console.error('Error fetching PDF:', error.message);
      res.status(500).send('An error occurred while fetching the PDF.');
    }
  }
};


const chatWithPDF = async (req, res) => {
  try {
      console.log('Chat with PDF target hit');
      const sourceId = req.session.sourceId;
      console.log('Source ID from chatwithPDF:', sourceId);

      if (!sourceId) {
          console.error('No sourceId found in session');
          return res.status(400).json({ message: 'No sourceId found in session. Please upload a PDF first.' });
      }

      const { question } = req.body;

      if (!question) {
          return res.status(400).json({ message: 'Question is required' });
      }

      // Send question and sourceId to ChatPDF API
      const response = await fetch('https://api.chatpdf.com/v1/chats/message', {
          method: 'POST',
          headers: {
              'x-api-key': CHATPDF_API_KEY,
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              sourceId,
              messages: [{ role: 'user', content: question }],
          }),
      });

      const data = await response.json();

      if (response.ok) {
          console.log('Response from ChatPDF:', data);
          return res.status(200).json({ reply: data.content });
      } else {
          console.error('Failed to chat with PDF:', data.message);
          return res.status(400).json({ message: 'Failed to chat with PDF' });
      }
  } catch (error) {
      console.error('Error in chatWithPDF:', error.message);
      return res.status(500).json({ message: 'Internal server error' });
  }
};





export { viewPDFController, chatWithPDF };
