const mongoose = require('mongoose');
const url = process.env.MONGO_URL;
mongoose.connect(url)
    .then(()=>{
        console.log('MongoDB connection established successfully...');
    }).catch((err)=>{
        console.log('Error while maknig MongoDB connection : ',err);
    })