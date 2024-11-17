const { app, Menu, BrowserWindow, ipcMain } = require('electron');

app.on('ready', () => {
	const window = new BrowserWindow({
		width: 800,
		height: 600,
	});

	Menu.setApplicationMenu(null);
	window.loadFile('index.html');
});
