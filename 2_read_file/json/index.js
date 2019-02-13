const fs = require('fs');
const path = require('path');

// Find the absolute file path, it is used for cross platform compatibility
const filePath = path.join(__dirname, 'file.json');
const fileData = fs.readFileSync(filePath, 'utf8');

// Read the data
const jsonData = JSON.parse(fileData);

console.log(jsonData);
