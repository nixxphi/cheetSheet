const mongoose = require('mongoose');
const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require('multer');
const path = require('path');

// Sample data for hospitals, fire stations, and police stations
const hospitalData = [
    { name: "St. Mary's Hospital", type: "Hospital", location: { latitude: 6.4483, longitude: 7.5114 }, contact_number: "123-456-7890" },
    { name: "City Clinic", type: "Clinic", location: { latitude: 6.4305, longitude: 7.5072 }, contact_number: "234-567-8901" }
];

const fireStationData = [
    { name: "Fire Station #1", type: "Fire Station", location: { latitude: 6.4495, longitude: 7.4902 }, contact_number: "456-789-0123" }
];

const policeStationData = [
    { name: "Enugu Police Headquarters", type: "Police Station", location: { latitude: 6.4559, longitude: 7.4968 }, contact_number: "345-678-9012" }
];

// Function to unify data types and format as JSON
function formatAsJSON(data) {
    return JSON.stringify(data);
}

// Mongoose connection setup
mongoose.Promise = global.Promise;
const dbURI = "your-mongodb-atlas-uri"; // Replace with your actual connection URI
const conn = mongoose.createConnection(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

// GridFS storage configuration for all collections
const storage = new GridFsStorage({
    url: dbURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const filename = `${req.params.collection}-${Date.now()}${path.extname(file.originalname)}`;
            const fileInfo = {
                filename,
                bucketName: req.params.collection // Collection name based on request params
            };
            resolve(fileInfo);
        });
    }
});

// Create upload Multer instance for all collections
const upload = multer({ storage });

// Routes for uploading files to specific collections
app.post('/upload/:collection', upload.single('file'), (req, res, next) => {
    if (!req.file) {
        return next(new Error('Please upload a file'));
    }
    console.log({ file: req.file });
    res.json({ message: `${req.params.collection} data uploaded successfully!` });
});

// Unify data types and upload sample data to respective collections
conn.once('open', async () => {
    try {
        const Hospital = conn.model('hospital', new mongoose.Schema({}), 'hospitalData');
        const FireStation = conn.model('fireStation', new mongoose.Schema({}), 'fireStationsData');
        const PoliceStation = conn.model('policeStation', new mongoose.Schema({}), 'policeStationsData');

        await Hospital.create(JSON.parse(formatAsJSON(hospitalData)));
        await FireStation.create(JSON.parse(formatAsJSON(fireStationData)));
        await PoliceStation.create(JSON.parse(formatAsJSON(policeStationData)));

        console.log('Sample data uploaded successfully!');
    } catch (error) {
        console.error('Error uploading sample data:', error);
    }
});

// Handle connection errors (optional)
conn.on('error', (err) => {
    console.error('Error connecting to MongoDB:', err);
});
