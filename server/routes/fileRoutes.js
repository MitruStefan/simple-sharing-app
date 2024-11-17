const express = require('express');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '../uploads'));
	},
	filename: (req, file, cb) => {
		cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
	},
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), (req, res) => {
	if (!req.file) {
		return res.status(400).send({ message: 'No file uploaded' });
	}

	res.send({
		message: 'File uploaded successfully',
		filePath: `/uploads/${req.file.filename}`,
	});
});

router.get('/download/:filename', (req, res) => {
	const filePath = path.join(__dirname, '../uploads', req.params.filename);
	res.download(filePath, err => {
		if (err) {
			res.status(500).send({ message: 'File not found' });
		}
	});
});

module.exports = router;
