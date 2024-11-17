document.getElementById('upload-button').addEventListener('click', async () => {
	const formData = new FormData(document.getElementById('uploadForm'));
	const fileInput = document.getElementById('fileInput');
	const status = document.getElementById('upload-status');

	if (!fileInput.files.length) {
		status.textContent = 'Please select a file to upload.';
		status.style.color = 'red';
		return;
	}

	status.textContent = 'Uploading...';
	status.style.color = 'black';

	try {
		const response = await fetch('http://localhost:3000/api/files/upload', {
			method: 'POST',
			body: formData,
		});

		const data = await response.json();

		if (data.error) {
			status.textContent = `Error: ${data.error}`;
			status.style.color = 'red';
		} else {
			status.textContent = `File uploaded successfully! File path: ${data.filePath}`;
			status.style.color = 'green';
		}
	} catch (error) {
		status.textContent = `Error: ${error.message}`;
		status.style.color = 'red';
	}
});
