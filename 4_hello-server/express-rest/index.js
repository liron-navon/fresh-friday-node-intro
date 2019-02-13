const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// we use body parser to easily parse requests data
// parse application/json
app.use(bodyParser.json());

const orders = [
    {
        "id": "1234",
        "product": "shirt",
        "price": "10$",
        "address": "Brouwersgracht 250, Amsterdam"
    }
];

app.get('/order', (req, res) => res.json(orders));
app.get('/order/:id', (req, res) => {
    const id = `${req.params.id}`;
    const order = orders.find(o => o.id === id);
    if (!order) {
        res.status(500);
        res.json({
            error: 'order does not exist'
        });
    } else {
        res.json(order)
    }
});

app.post('/order', (req, res) => {
    const order = req.body;
    orders.push(order);
    res.json(order);
});

app.delete('/order/:id', (req, res) => {
    const id = `${req.params.id}`;
    const orderIndex = orders.findIndex(o => o.id === id);
    const order = orders[orderIndex];
    if (!order) {
        res.status(500);
        res.json({
            error: 'order does not exist'
        });
    } else {
        orders.splice(orderIndex, 1);
        res.json(order);
    }
});

app.put('/order/:id', (req, res) => {
    const id = `${req.params.id}`;
    const order = orders.find(o => o.id === id);
    if (!order) {
        res.status(500);
        res.json({
            error: 'order does not exist'
        });
    } else {
        Object.assign(order, req.body);
        res.json(order);
    }
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened 😥', err)
    }
    console.log(`server is listening on http://localhost:${port}/   🚀`)
});
