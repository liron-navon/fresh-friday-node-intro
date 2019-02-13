const path = require('path');
const express = require('express');
const expressHandlebars  = require('express-handlebars');

const app = express();
const port = 3000;

const viewsDirectory = path.join(__dirname, 'views');

app.engine('.hbs', expressHandlebars({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(viewsDirectory, 'layouts'),
}));

app.set('view engine', '.hbs');
app.set('views', viewsDirectory);

app.get('/', (request, response) => {
    response.render('home', {
        name: 'John'
    });
});

app.get('/:name', (request, response) => {
    response.render('home', {
        name: request.params.name
    });
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened 😥', err)
    }
    console.log(`server is listening on http://localhost:${port}/   🚀`)
});
