const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3002;

// Serve static files
app.use(express.static('.'));

// Serve the download page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'download-project.html'));
});

// Serve the project archive
app.get('/lca-platform-project.tar.gz', (req, res) => {
  const filePath = path.join(__dirname, 'lca-platform-project.tar.gz');
  
  if (fs.existsSync(filePath)) {
    res.download(filePath, 'lca-platform-project.tar.gz');
  } else {
    res.status(404).send('Archive not found. Please regenerate the project archive.');
  }
});

app.listen(PORT, () => {
  console.log(`📦 Download server running at http://localhost:${PORT}`);
  console.log(`🔗 Access your download page: http://localhost:${PORT}`);
});