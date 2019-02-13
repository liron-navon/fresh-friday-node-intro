const express = require('express');
const app = express();
const port = 3000;

// this can be a directory that contains our Vue,React,Angular code or any other static files
app.use(express.static('public'));

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened 😥', err)
    }
    console.log(`server is listening on http://localhost:${port}/   🚀`)
});
