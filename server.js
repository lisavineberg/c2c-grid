const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(port, () => {
    console.log(`example app listening at ${port}`)
})