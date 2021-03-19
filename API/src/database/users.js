const {getDatabase} = require('./mongo');
const ObjectId = require('mongodb').ObjectId; 

const collectionName = 'users';

async function insertuser(user) {
  const database = await getDatabase();
  const {insertedId} = await database.collection(collectionName).insertOne(user);
  return insertedId;
}

async function getusers() {
  const database = await getDatabase();
  return await database.collection(collectionName).find({}).toArray();
}

async function getuser(id) {
    const database = await getDatabase();
    console.log(id);
    return await database.collection(collectionName).find({ "_id": ObjectId(id) }).toArray();
  }

module.exports = {
  insertuser,
  getusers,
  getuser
};