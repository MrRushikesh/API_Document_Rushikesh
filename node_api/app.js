let express = require('express');
let app = express();
let dotenv = require('dotenv');
dotenv.config()
// let port = process.env.PORT || 9500;
let port = 9500;
let cors = require('cors');
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let bodyParser = require('body-parser');
// let mongoUrl = "mongodb://localhost:27017";
let mongoUrl = "mongodb+srv://test:test123@cluster0.fp1yuey.mongodb.net/test"
let db;

// middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/',(req,res) => {
    res.send('<h1>Hii From Express.js</h1>')
})

// http://localhost:9500/location

app.get('/location',(req,res) => {
   db.collection('location').find().toArray((err,result) => {
       if(err) throw err;
       res.send(result)
   })
})


//http://localhost:9500/restaurants
//http://localhost:9500/restaurants?stateId=3
//http://localhost:9500/restaurants?mealId=4&stateId=3
//http://localhost:9500/restaurants?mealId=3


app.get('/restaurants',(req,res) => {
    let stateId = Number(req.query.stateId)
    let mealId = Number(req.query.mealId)
    let query = {}
    if(stateId && mealId){
        query={state_id:stateId,"mealTypes.mealtype_id":mealId}
    }else if(stateId){
        query={state_id:stateId}
    }else if(mealId){
        query={"mealTypes.mealtype_id":mealId}
    }
    db.collection('restaurants').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
 })

 //http://localhost:9500/filters/1?cuisineId=4
 //http://localhost:9500/filters/1?lcost=100&hcost=500
 //http://localhost:9500/filters/1?lcost=100&hcost=500&sort=-1

 app.get('/filters/:mealId',(req,res) => {
     let query = {};
     let mealId = Number(req.params.mealId);
     let cuisineId = Number(req.query.cuisineId);
     let lcost = Number(req.query.lcost);
     let hcost = Number(req.query.hcost);
     let sort = {cost:1};
     if(req.query.sort){
         sort={cost:req.query.sort}
     }

     if(cuisineId){
         query={
            "mealTypes.mealtype_id":mealId,
            "cuisines.cuisine_id":cuisineId
         }
     }else if(lcost && hcost){
        query={
            "mealTypes.mealtype_id":mealId,
            $and:[{cost:{$gt:lcost,$lt:hcost}}]
         }
     }
     db.collection('restaurants').find(query).sort(sort).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
 })
 

//http://localhost:9500/mealType

 app.get('/mealType',(req,res) => {
    db.collection('mealType').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
 })

//http://localhost:9500/details/10

app.get('/details/:restId',(req,res) => {
    let id = Number(req.params.restId)
    db.collection('restaurants').find({restaurant_id:id}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})


//http://localhost:9500/menu/10

app.get('/menu/:restId',(req,res) => {
    let id = Number(req.params.restId)
    db.collection('menu').find({restaurant_id:id}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})



//Menu user selected -:

//http://localhost:9500/menuItem
// {
// 	"id":[1,2,3]
// }

app.post('/menuItem',(req,res) => {
    if(Array.isArray(req.body.id)){
        db.collection('menu').find({menu_id:{$in:req.body.id}}).toArray((err,result) => {
            if(err) throw err;
            res.send(result)
        })
    }else{
        res.send('Invalid Input')
    }
})

//Place Order API -: 

// http://localhost:9500/placeOrder
// {
// 	"orderId" : 3,
// 	"name" : "Rushikesh",
// 	"email" : "rushi@gmail.com",
// 	"address" : "Hom 65",
// 	"phone" : 7447640893,
// 	"cost" : 391,
// 	"menuItem" : [
// 		3,65,12
// 	]
// }

app.post('/placeOrder',(req,res) => {
    db.collection('orders').insert(req.body,(err,result) => {
        if(err) throw err;
        res.send('Order Placed')
    })
})

//View Order -: 

//http://localhost:9500/viewOrder
//http://localhost:9500/viewOrder?email=rushi@gmail.com //With respect to mail id

app.get('/viewOrder',(req,res) => {
    let email = req.query.email;
    let query = {};
    if(email){
        query={email:email}
    }else{
        query={}
    }
    db.collection('orders').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})


//Update order -:

// http://localhost:9500/updateOrder/1

// {
// 	"status":"Delivered",
// 	"bank_name":"HDFC Bank",
// 	"date":"07/01/2023"
// }

app.put('/updateOrder/:id',(req,res) => {
    let oid = Number(req.params.id);
    db.collection('orders').updateOne(
        {orderId:oid},
        {
            $set:{
                "status":req.body.status,
                "bank_name":req.body.bank_name,
                "date":req.body.date
            }
        },(err,result) =>{
            if(err) throw err;
            res.send('Order Updated')
        }
    )
})

//Delete order -:

//http://localhost:9500/deleteOrder/63a854090e78b8c74289445c

app.delete('/deleteOrder/:id',(req,res) => {
    let _id = mongo.ObjectId(req.params.id);
    db.collection('orders').remove({_id},(err,result) => {
        if(err) throw err;
        res.send('Order Deleted')
    })
})

// Connect with Mongodb
MongoClient.connect(mongoUrl,{useNewUrlParser:true},(err,dc) => {
    if(err) console.log('Error while connecting');
    db = dc.db('zomato');
    app.listen(port,() => {
        console.log(`Server is running on port ${port}`)
    })
})