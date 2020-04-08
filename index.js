//declare middleware
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
//use middleware
const app = express();
app.use(cors());
app.use(bodyParser.json());
//database related information
//const dbUser=dbUser;
//const pass = password6356;
//const uri = "mongodb+srv://dbUser:password6356@cluster0-gsq7r.mongodb.net/test?retryWrites=true&w=majority";
const uri = "mongodb://dbWebUser:krYFPv37jD1emDoD@cluster0-shard-00-00-gsq7r.mongodb.net:27017,cluster0-shard-00-01-gsq7r.mongodb.net:27017,cluster0-shard-00-02-gsq7r.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"
let client = new MongoClient(uri, { useNewUrlParser: true });

// //get request
 app.get('/products',(req, res)=>{
 client = new MongoClient(uri, { useNewUrlParser: true });

    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        collection.find().toArray((err,documents)=>{
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