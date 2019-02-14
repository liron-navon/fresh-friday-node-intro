const path = require('path');
const express = require('express');
const expressHandlebars  = require('express-handlebars');

const app = express();
const port = 3000;

const viewsDirectory = path.join(__dirname, 'views');

// setup the handlebars engine
app.engine('.hbs', expressHandlebars({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(viewsDirectory, 'layouts'),
}));

// setup the views directory and file extension for express to look for
app.set('view engine', '.hbs');
app.set('views', viewsDirectory);

// render home with some generic name
app.get('/', (request, response) => {
    response.render('home', {
        name: 'John'
    });
});

// render home with a name
app.get('/:name', (request, response) => {
    response.render('home', {
        name: request.params.name
    });
});

// listen for calls
app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened 😥', err)
    }
    console.log(`server is listening on http://localhost:${port}/   🚀`)
});
