
const mongoose = require('mongoose');
const config = require('./env.config')

module.exports = () => {
    //create a connection pool to the main database, you can add connection to other databases
    mongoose.connect(config['main_db_url'], {useNewUrlParser: true, useUnifiedTopology: true},()=>{
        console.log('Connected to DB ');
        });
    const mainPool = mongoose.connection;

    mainPool.on('connected',()=>{
        console.log("Mongoose main connection pool is open to the main database");
    });

    mainPool.on('error', function(err){
        console.log("Mongoose main connection pool has occured "+err+" error");
    });

    mainPool.on('disconnected', function(){
        console.log("Mongoose main connection pool is disconnected");
    });

    process.on('SIGINT', function(){
        mainPool.close(function(){
            console.log("Mongoose main connection pool is disconnected due to application termination");
            process.exit(0)
        });
    });
}