const { MongoClient } = require('mongodb');

const URI = 'mongodb://127.0.0.1:27017'
const dbName = 'SportBook'
const client = new MongoClient(URI)

client.connect()

const db = client.db(dbName)
const users = db.collection('User')

module.exports = {
    users
}