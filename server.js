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
    try{
        const orderResponse = await data.GetOrders({skipValue: 0, limitValue: 4});
        return res.status(200).send(orderResponse);
    }
    catch(err){
        return res.status(400).send({
            error: 'Something went wrong'
        })
    }
    
});

app.get('/order/:id',async(req,res)=>{
    try{
        const id = req.params.id;

        const orderResponse = await data.GetOrder({id});
        return res.send(orderResponse);
    }
    catch(err){
        return res.status(400).send({
            error: 'Something went wrong'
        })
    }
})

app.post('/order',async(req,res)=>{

    try{
    //console.log('order',req.body);
        const newOrder = await data.NewOrder(req.body);

        return res.status(200).send(newOrder.result);
    }
    catch(err){
        return res.status(400).send({
            error: 'Something went wrong'
        })
    }
})

app.patch('/order',async(req,res)=>{

    try{
        const {id, email, phone} = req.body;

        const orderResponse = await data.EditOrder({id, email, phone});

        return res.status(200).send(orderResponse.result);
    }
    catch(err){
        return res.status(400).send({
            error: 'Something went wrong'
        })
    }
})