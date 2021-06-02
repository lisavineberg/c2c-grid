// run `node server.js`

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;
const MongoClient = require('mongodb').MongoClient;
const dotenv = require("dotenv")

dotenv.config();
app.use(bodyParser.raw({ type: '*/*' }))
const uri = `mongodb+srv://c2c-grid:${process.env.DB_PASSWORD}@c2c-grid.ootp8.mongodb.net/stored_images?retryWrites=true&w=majority`;
let con;

async function connect() {
    if (con) return con; // return connection if already conncted
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    con = client.connect()
    return con;
 }

async function insert(image) {
    const client = await connect();
    const collection = client.db("stored_images").collection("stored_images");
    collection.insertOne(image, (err, result) => {
        if (err) throw err;
        console.log("success")
    })
}

async function getImage(image) {
    const client = await connect();
    const collection = client.db("stored_images").collection("stored_images");
    const foundImage = await collection.findOne({ name: image })

    return foundImage
}

app.post('/addImageToDb', (req, res) => {
    const parsedBody = JSON.parse(req.body.toString());
    insert(parsedBody);
})

app.post('/getImageFromDb', async(req, res) => {
    const animal = JSON.parse(req.body.toString()).name;
    const image = await getImage(animal);
    res.send(image)
})

app.listen(port, () => {
    console.log(`example app listening at ${port}`)
})