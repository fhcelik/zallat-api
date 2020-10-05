'use strict';

const MongoClient = require('mongodb').MongoClient;

const url = "mongodb+srv://user54:753951@cluster0.giqg9.mongodb.net/zallat?retryWrites=true&w=majority";

let dbConnection;

const connect = () => MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const getConnection = () => {
    if (!dbConnection) {
      dbConnection = connect();
    }
    return dbConnection;
  };

const getDb = () => getConnection().then(connection => connection.db('zallat'));

exports.getCollection = collection =>
  getDb().then(db => db.collection(collection));





