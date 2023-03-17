const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/travel');

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