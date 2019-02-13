const Jimp = require('jimp');
const path = require('path');

const inputFile = path.join(__dirname,'jellyfish.jpg');
const outputFile = path.join(__dirname,'jellyfish-small-bw.jpg');

Jimp
    .read(inputFile)
    .then((image) => {
        return image
            .resize(256, Jimp.AUTO) // resize
            .greyscale() // set greyscale
            .blur(1) // add some blur
            .write(outputFile); // save
    })
    .then(() => {
        console.log('Done 🤗')
    })
    .catch((err) => {
        console.error('Oh No 😱', err)
    });
