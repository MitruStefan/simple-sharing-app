const { app, Menu, BrowserWindow, ipcMain } = require('electron');
const WebSocket = require('ws');

app.on('ready', () => {
	const window = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	Menu.setApplicationMenu(null);
	window.loadFile('index.html');

	// WebSocket client
	const ws = new WebSocket('ws://localhost:3000');

	ws.on('open', () => {
		console.log('Connected to WebSocket server');
	});

	ws.on('message', message => {
		console.log(`Received message: ${message}`);
		window.webContents.send('ws-message', message);
	});

	ws.on('close', () => {
		console.log('Disconnected from WebSocket server');
	});
});
