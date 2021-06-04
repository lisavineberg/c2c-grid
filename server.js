// run `node server.js`

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 8080;
const MongoClient = require("mongodb").MongoClient;
const dotenv = require("dotenv")

//  
const path = require('path');

dotenv.config();
app.use(bodyParser.raw({ type: "*/*" }))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// 

const uri = `mongodb+srv://c2c-grid:${process.env.DB_PASSWORD}@c2c-grid.ootp8.mongodb.net/stored_images?retryWrites=true&w=majority`;
let con;

async function connect() {
    if (con) return con; // return connection if already conncted
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    con = client.connect()
    return con;
}

async function checkIfExists(image) {
    const client = await connect();
    const collection = client.db("stored_images").collection("stored_images");
    const foundImage = await collection.findOne({ name: image });
    if (foundImage) {
        return false;
    } else {
        return true;
    }
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

async function getImages() {
    const client = await connect();
    const collection = client.db("stored_images").collection("stored_images");
    const cursor = await collection.find().toArray();
    const images = cursor.map( item => item.name )
    return images;
}

app.get("/getStoredImages", async(req, res) => {
    const images = await getImages();
    res.send(images);
})

app.post("/addImageToDb", async(req, res) => {
    const parsedBody = JSON.parse(req.body.toString());
    const valid = await checkIfExists(parsedBody.name);
    if (valid) {
        insert(parsedBody);
        res.send("valid");
    } else {
        res.send("invalid");
    }
})

app.post("/getImageFromDb", async(req, res) => {
    const animal = JSON.parse(req.body.toString()).name;
    const image = await getImage(animal);
    res.send(image)
})

app.listen(port, () => {
    console.log(`example app listening at ${port}`)
})