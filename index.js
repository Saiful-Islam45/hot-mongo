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
const uri = "mongodb+srv://dbUser:password6356@cluster0-gsq7r.mongodb.net/test?retryWrites=true&w=majority";
let client = new MongoClient(uri, { useNewUrlParser: true });

// //get request
 app.get('/products',(req, res)=>{
client = new MongoClient(uri, { useNewUrlParser: true });

    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        collection.find.toArray((err,documents)=>{
            console.log("database");
            
            if (err) {
                console.log(err);
                res.status(500).send({message:err});
                
            }
           else{
          
            res.send(documents); 
           }  
        });
        client.close();
      });
})
// //post request
app.post('/addProduct',(req,res)=>{
    //save to database
    const product = req.body;
    client = new MongoClient(uri, { useNewUrlParser: true });
    console.log(product);
    
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        collection.insertOne(product ,(err,result)=>{
            if (err) {
                console.log(err);
                res.status(500).send({message:err});
                
            }
           else{
          
            res.send(result.ops[0]); 
           }  
        });
        client.close();
      });
});
app.listen(3000, ()=>console.log("Listening at Port 3000"));