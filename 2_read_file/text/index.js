const fs = require('fs');
const path = require('path');

// Find the absolute file path, it is used for cross platform compatibility
const filePath = path.join(__dirname, 'file.txt');

// Read the data
const data = fs.readFileSync(filePath, 'utf8');

console.log(data);
