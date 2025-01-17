import eBook from '../models/ebookModel.js';
import fetch from 'node-fetch';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import os from 'os';

const CHATPDF_API_KEY = 'sec_341Ff7OXkzYyI9V2d42KIEhNGcx0iyHf';

// Fetch all eBooks
export const getEbooks = async (req, res) => {
    try {
        const ebooks = await eBook.find();
        const role = req.session.role; // Get role from session

        // Render the ebooks view and pass the role along with ebooks
        res.render('ebooks', { ebooks, role });
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).send('Error fetching books');
    }
};

 export const uploadPdfToChatPDF = async(req, res) => {
    console.log('uploadPdfToChatPDF target hit');
    try {
        // Fetch the eBook from the database
        const eBookData = await eBook.findById(req.params.id);
  
        if (!eBookData || !eBookData.bookPDF || !eBookData.bookPDF.data) {
          return res.status(404).send('eBook or PDF data not found');
        }
  
        // Write PDF binary data to a temporary file
        const tempFilePath = path.join(os.tmpdir(), `${eBookData.bookName || 'temp'}.pdf`);
        fs.writeFileSync(tempFilePath, eBookData.bookPDF.data);
  
        // Prepare the FormData
        const formData = new FormData();
        formData.append('file', fs.createReadStream(tempFilePath));
  
        // Make the API request to ChatPDF
        const response = await fetch('https://api.chatpdf.com/v1/sources/add-file', {
          method: 'POST',
          body: formData,
          headers: {
            'x-api-key': CHATPDF_API_KEY,
            ...formData.getHeaders(),
          },
        });
  
        const result = await response.json();

  
        if (!response.ok) {
          throw new Error(result.message || 'Failed to upload PDF');
        }

        req.session.sourceId = result.sourceId;
  
        console.log('Source ID from uploadPDF:', req.session.sourceId);
        
        // Store sourceId in the session (or database, if persistent storage is needed)
        req.session.sourceId = result.sourceId;
  
        res.json({
          message: 'PDF successfully uploaded to ChatPDF!',
          sourceId: result.sourceId,
        });

        // Clean up the temporary file
        fs.unlinkSync(tempFilePath);
      } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Failed to upload PDF to ChatPDF.');
      }
 }
