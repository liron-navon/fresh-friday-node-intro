const fs = require('fs');
const path = require('path');

// Find the absolute file path, it is used for cross platform compatibility
const filePath = path.join(__dirname, 'file.json');

const myData = {
    name: 'Liron Navon',
    country: 'Israel',
    currentCountry: 'Netherlands',
    age: '25',
    company: 'ClockWork'
};

// we need a string to write
const myDataAsString = JSON.stringify(myData, null, 2);

// write the data
fs.writeFile(filePath, myDataAsString, (err) => {
    if (err) {
        console.error('Something broke', err);
    } else {
        console.log('written data');
    }
});


