const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const data = require('./mongo.js');

app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})


app.get('/orders',async(req,res)=>{

    const orderResponse = await data.GetOrders({skipValue: 0, limitValue: 4});

    return res.status(200).send(orderResponse);
});

app.get('/order/:id',async(req,res)=>{
    const id = req.params.id;

    const orderResponse = await data.GetOrder({id});
    return res.send(orderResponse);
})

app.post('/order',async(req,res)=>{

    console.log('order',req.body);
    const newOrder = await data.NewOrder(req.body);

    return res.status(200).send(newOrder.result);
})

app.patch('/order',async(req,res)=>{

    const {id, email, phone} = req.body;

    const orderResponse = await data.EditOrder({id, email, phone});

    return res.status(200).send(orderResponse.result);
})