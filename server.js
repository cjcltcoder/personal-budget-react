// Budget API

const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;

app.use(cors());

const budget = {
    myBudget: [
        {
            title: 'Eat out',
            budget: 25
        },
        {
            title: 'Rent',
            budget: 275
        },
        {
            title: 'Grocery',
            budget: 110
        },
        {
            title: 'Car',
            budget: 600
        }
    ]
};


app.get('/budget', (req, res) => {
    res.json(budget);
});

app.get('/chart', (req, res) => {
    res.json(budget);
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});