// this file will handle connection logic to the MongoDB database

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/TaskManager', { useNewUrlParser: true, useUnifiedTopology:true}).then(() => {
    console.log("Connected to mongoDB");
}).catch((e) => {
    console.log("Error while connecting to mongoDB",e);
});

module.exports = {
    mongoose
}