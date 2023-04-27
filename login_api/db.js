let mongoose = require('mongoose');

mongoose.set('strictQuery',false);
// mongoose.set('strictQuery',true);

mongoose.connect('mongodb://localhost:27017/zomato')