const fs = require('fs');
const path = require('path');

// Find the absolute file path, it is used for cross platform compatibility
const filePath = path.join(__dirname, 'file.txt');

const myData = {
    name: 'Liron Navon',
    country: 'Israel',
    currentCountry: 'Netherlands',
    age: '25',
    company: 'ClockWork'
};

const streamOptions = {
    // flags: 'a', // to append to a file
    encoding: 'utf8'
};

// we need to create a stream
const writeSrteam = fs.createWriteStream(filePath, streamOptions);

// listen to events on the stream
writeSrteam.on('error', (error) => {
   console.error('Error while writing to stream', error);
});
writeSrteam.on('finish',() => {
    console.log('Done writing to stream');
});

// just write stuff to the stream
Object.entries(myData).forEach(([key, value]) =>{
    writeSrteam.write(`${key}=${value}\n`);
});

// close the stream
writeSrteam.end();
