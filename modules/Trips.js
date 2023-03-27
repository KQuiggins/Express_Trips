const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
//mongoose.connect('mongodb://127.0.0.1:27017/travel');

require('dotenv').config()

const uri = process.env.MONGODB_URI
//const test_uri = process.env.PLAYGROUND_URI
//const compass_uri = process.env.COMPASS_URI

// Connect to the MongoDB Atlas cluster


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
const tripSchema = new mongoose.Schema({
    driver: {type: String, required: true},
    date: {type: String, required: true},
    city: {type: String, required: true},
    miles: {type: Number, required: true},
    gallons: {type: Number, required: true},
});

tripSchema.virtual('milesPerGallon').get(function() {
    return this.miles / this.gallons;
  });

const TripsModel = mongoose.model('trips', tripSchema);

module.exports = TripsModel