//declare middleware
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

//use middleware
const app = express();
app.use(cors());
app.use(bodyParser.json());
//database related information

//const uri = "mongodb+srv://dbUser:password6356@cluster0-gsq7r.mongodb.net/test?retryWrites=true&w=majority";
const uri = process.env.DB_PATH;
let client = new MongoClient(uri, { useNewUrlParser: true });

// //get request
 app.get('/products',(req, res)=>{
 client = new MongoClient(uri, { useNewUrlParser: true });

    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        collection.find().limit(5).toArray((err,documents)=>{
            if (err) {
                console.log(err);
                res.status(500).send({message:err});
            }
           else{
            res.send(documents); 
            
           }  
        });
        //client.close();
      });
})
// //post request
app.post('/addProduct',(req,res)=>{
    //save to database
    const product = req.body;
    console.log("Product",product);
    client = new MongoClient(uri, { useNewUrlParser: true});
    
    
    client.connect(error => {
        const collection = client.db("onlineStore").collection("products");
        collection.insertOne(product ,(err,result)=>{
            if (err) {
                console.log(err);
                res.status(500).send({message:err});
            }
           else{
          console.log("Database Connected");
          
            res.send(result.ops[0]); 
           }  
        });
        //client.close();
      });
});
const port=process.env.PORT ||3000
app.listen(port, ()=>console.log("Listening at Port 3000"));