import express from 'express';
import multer from 'multer';
import xlsx from 'xlsx';
import mongoose from 'mongoose';
import { GridFsStorage } from 'multer-gridfs-storage';
import path from 'path';

const app = express();
const upload = multer({ dest: 'uploads/' });

// MongoDB connection setup
mongoose.Promise = global.Promise;
const dbURI = "your-mongodb-atlas-uri"; // Replace with your actual connection URI
const conn = mongoose.createConnection(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

// GridFS storage configuration
const storage = new GridFsStorage({
    url: dbURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const filename = `${path.basename(file.originalname, path.extname(file.originalname))}-${Date.now()}${path.extname(file.originalname)}`;
            const fileInfo = {
                filename,
                bucketName: path.basename(file.originalname, path.extname(file.originalname)) // Collection name based on filename
            };
            resolve(fileInfo);
        });
    }
});

// Create upload Multer instance
const uploadFile = multer({ storage });

// Routes for uploading files to specific collections
app.post('/upload/:collection', uploadFile.single('file'), (req, res, next) => {
    if (!req.file) {
        return next(new Error('Please upload a file'));
    }
    console.log({ file: req.file });
    res.json({ message: `${req.params.collection} data uploaded successfully!` });
    
    // Parse the uploaded Excel file
    const workbook = xlsx.readFile(req.file.path);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(worksheet, { raw: true });

    // Insert data into MongoDB
    conn.once('open', async () => {
        try {
            const Model = conn.model(req.params.collection, new mongoose.Schema({}), req.params.collection);
            await Model.create(data);
            console.log('Data uploaded successfully');
        } catch (error) {
            console.error('Error uploading data:', error);
        }
    });

    // Handle connection errors (optional)
    conn.on('error', (err) => {
        console.error('Error connecting to MongoDB:', err);
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
