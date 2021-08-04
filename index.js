const express = require('express');
const app = express();
const port = 3000;

//parse json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// DATABASE
const mongodb=require('mongodb');
const MongoClient=mongodb.MongoClient

const connectURL='mongodb://127.0.0.1:27017';
const dataBaseName='myDB';
MongoClient.connect(connectURL,{useNewUrlParser:true},(err,client)=>{
    if(err){
        return console.log('Unable to connect to database');
    }
    const db=client.db(dataBaseName);

    //POST an orderItem
    app.post('/orderItem', (req, res) => {
        const obj = req.body;
        const id = obj["id"];
        delete obj["id"];
        db.collection('orderItems').findOne({"id":id},(err,item)=>{
            if(typeof item=="undefined"){
                let oo=[];
                oo.push(obj);
                db.collection('orderItems').insertOne({
                    "id":id,
                    "items":oo
                })
            }
            else{
                let oo =item.items; 
                oo.push(obj);
                db.collection('orderItems').updateOne({
                    "id":id
                },{
                    $set:{
                        items: oo
                    }
                })
            }    
        })
        res.send("This order item has been added to the orderItems list.");
    })


    // POST Order
    app.post('/order', (req, res) => {
        const obj = req.body;
        const id = obj["id"];
        delete obj["id"];
        const phone = obj["phone"];
        let oo;
        db.collection('orderItems').findOne({"id":id},(err,item)=>{
            if(typeof item=="undefined"){
                res.send("Order ID not found.");
            }
            else{
                oo =item.items; 
            }    
        })
        //add current order to Total Order List
        db.collection('order').findOne({"id":id},(err,item)=>{
            if(typeof item=="undefined"){
                db.collection('order').insertOne({
                    "id":id,
                    "orderItems":oo,
                    "phone":phone
                })
            }
            else{
                db.collection('order').updateOne({
                    "id":id
                },{
                    $set:{
                        orderItems: oo,
                        phone:phone
                    }
                })
            }    
        })
        res.send("New Order with id: "+id+" has been placed.");
    })

    //GET order By ID
    app.get('/getOrderByID', (req, res) => {
        const obj = req.body;
        const id = obj["id"];

        db.collection('order').findOne({"id":id},(err,item)=>{
            if(typeof item=="undefined"){
                res.send("Order Id not found.");
            }
            else{
                delete item["_id"];
                delete item["id"];
                res.json(item);
            }    
        })
    })

    // GET all order
    app.get('/getAllOrder', (req, res) => {
        const obj = db.collection('order');
        obj.find({}).toArray(function(err, ord) {
            res.status(200).json({'All Orders' : ord});
         })
    })
})


//listen
app.listen(port, () => {
    console.log('Server is listening at port ' + port);
})