const express = require('express');
const fileRoutes = require('./routes/fileRoutes');
const cors = require('cors');
const dotenv = require('dotenv');
const { WebSocketServer } = require('ws');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/files', fileRoutes);

// Start the server
const server = app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});

// WebSocket server
const wss = new WebSocketServer({ server });

wss.on('connection', ws => {
	console.log('Client connected');

	ws.on('message', message => {
		console.log(`Received message: ${message}`);
	});

	ws.on('close', () => {
		console.log('Client disconnected');
	});
});

module.exports = { wss };
