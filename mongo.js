const { MongoClient, ObjectId, Server } = require('mongodb');

const connection = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/';
const dbName = 'shopify';
var db;


MongoClient.connect(connection,{useNewUrlParser: true,  useUnifiedTopology: true }, function(err, client) {
  if(err) throw err;

  db = client.db(dbName);
});


const GetOrders = (orderFilter)=>{

    return new Promise((resolve,reject)=>{
        db.collection('orders').find({}).skip(orderFilter.skipValue).limit(orderFilter.limitValue).toArray().then(res =>{
            resolve(res);
        });
    
    })
    
};

const GetOrder = (order)=>{
    return new Promise((resolve,reject)=>{
        db.collection('orders').findOne({_id:ObjectId(order.id)}).then(res =>{
            resolve(res);
        });
    });    
}

const NewOrder = (order)=>{
    return new Promise((resolve,reject)=>{
        db.collection('orders').insertOne(order).then(res =>{
            resolve(res);
        });
    });  
}

const EditOrder = (order)=>{
    return new Promise((resolve,reject)=>{
        db.collection('orders').updateOne({_id:ObjectId(order.id)},{$set: order }).then(res =>{
            resolve(res);
        });
    });  
}


module.exports = {
    GetOrders,
    GetOrder,
    NewOrder,
    EditOrder
}