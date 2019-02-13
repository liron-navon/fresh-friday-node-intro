const express = require('express');
const app = express();
const port = 3000;

app.post('/hello', (req, res) => res.send('Nothing to post here 🤔'));

app.get('/cat', (req, res) => res.redirect('https://cataas.com/cat'));

app.get('/hello', (req, res) => res.send(`
<html>
    Hello there!, try visiting <a href="http://localhost:${port}/cat">http://localhost:${port}/cat<a>
</html>
`));

app.get('/hello/:message', (req, res) => res.send(`
<html>
    ${req.params.message}
</html>
`));

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened 😥', err)
    }
    console.log(`server is listening on http://localhost:${port}/   🚀`)
});
