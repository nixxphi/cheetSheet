import mongoose from 'mongoose';
import { GridFsStorage } from 'multer-gridfs-storage';
import path from 'path';
import dotenv from 'dotenv';
// MongoDB connection setup
mongoose.Promise = global.Promise;
const dbURI = process.env.MONGODB_URI;
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

// Error handling middleware
const handleError = (err, req, res, next) => {
    console.error(err);
    let statusCode = 500;
    let message = 'Internal Server Error';

    if (err instanceof multer.MulterError) {
        statusCode = 400; // Bad request

        switch (err.code) {
            case 'LIMIT_FILE_SIZE':
                message = 'File size exceeds limit.';
                break;
            case 'LIMIT_FILE_COUNT':
                message = 'Too many files uploaded.';
                break;
            default:
                message = err.message;
        }
    }

    res.status(statusCode).json({ message });
};

// Routes for uploading files to specific collections
app.post('/upload/:collection', uploadFile.single('file'), (req, res, next) => {
    if (!req.file) {
        return next(new Error('Please upload a file'));
    }
    console.log({ file: req.file });
    res.json({ message: `${req.params.collection} data uploaded successfully!` });
    
    // Handle connection errors (optional)
    conn.on('error', (err) => {
        console.error('Error connecting to MongoDB:', err);
    });
});

conn.once('open', () => {
    console.log('Connected to MongoDB database');
});

// Handle connection errors (optional)
conn.on('error', (err) => {
    console.error('Error connecting to MongoDB:', err);
});

export { conn, handleError };
