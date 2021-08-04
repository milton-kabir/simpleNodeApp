const express = require('express');
const app = express();
const port = 3000;

//parse json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


let order = new Map();
let orderItems = new Map();


//GET order By ID
app.get('/getOrderByID', (req, res) => {
    const obj = req.body;
    const id = obj["id"];

    if (order.has(id)) {
        let xx = order.get(id);
        res.json(xx);
    }
    else {
        res.send("Order Id not found.");
    }
})

// GET all order
app.get('/getAllOrder', (req, res) => {
    const obj = Object.fromEntries(order);
    res.json(obj);
})

//POST an orderItem
app.post('/orderItem', (req, res) => {
    const obj = req.body;
    const id = obj["id"];
    delete obj["id"];
    if (orderItems.has(id)) {
        let xx = orderItems.get(id);
        xx.push(obj);
        orderItems.set(id, xx);
    }
    else {
        let oo = [];
        oo.push(obj);
        orderItems.set(id, oo);
    }

    res.send("This order item has been added to the orderItems list.");
})

// POST Order
app.post('/order', (req, res) => {
    const obj = req.body;
    const id = obj["id"];
    const phone = obj["phone"];
    let xx = orderItems.get(id);
    let newOrder = {};

    //add current order to Total Order List

    newOrder["orderItems"] = xx;
    newOrder["phone"] = phone;
    order.set(id, newOrder);

    res.send("New Order has been placed.");

})




//listen
app.listen(port, () => {
    console.log('Server is listening at port ' + port);
})