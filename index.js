const express = require("express");
const { MongoClient } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rnw2g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();
        // to check if it connects with database successfully
        // console.log('connected to database');
        const database = client.db('yooda-hostel')
        const foodCollection = database.collection('foods')

        // ADD Food to the Database
        app.post('/foods', async (req, res) => {
            
            const food = {
                "name": "Burger",
                "price": 2000
            }
            const result = await foodCollection.insertOne(food);
            console.log(result)
        })
    }
    catch(error) {
        console.log(error.message)
    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Running my CRUD Server')
})

app.listen(port, ()=>{
    console.log('Running server on port', port)
})