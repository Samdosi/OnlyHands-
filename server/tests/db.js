const mongoose = require('mongoose');
const { MongoMemoryServer} = require('mongodb-memory-server');

//conncet to db
const connect = async()=>{
    const mongod = await MongoMemoryServer.create();
    const uri= mongod.getUri();
    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: 10
    };
    await mongoose.connect(uri, mongooseOpts);
}

//disconnect and close connection
const closeDatabase = async()=>{
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
}

//clear the db, remove all data
const clearDatabase = async()=>{
    const collections = mongoose.connection.collections;
    for(const key in collections){
        const collection = collections[key];
        await collection.deleteMany();
    }
}

module.exports = {connect, closeDatabase, clearDatabase};