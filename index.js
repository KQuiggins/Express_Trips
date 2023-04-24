const express = require('express');
const app = express();


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const Trips = require('./modules/Trips.js');

nunjucks = require('nunjucks');

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.set('view engine', 'html');

app.use(express.static('public'));

app.get('/', async (req, res) => {
    try {
        const trips = await Trips.find({});
        res.render('showAll.html', { trips });
        //console.log(trips);
    } catch (error) {
        //console.error(error);
        res.status(500).send('Error retrieving trip data.');
    }
});

app.get('/edit', async (req, res) => {
  try {
      const date = req.query.date;
      const trip = await Trips.findOne({ date });
      if (trip) {
          res.render('editTripForm', { tripInfo: trip });
      } else {
          res.status(404).send('Trip not found.');
      }
  } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving trip data.');
  }
});


app.post('/updateTrip', async (req, res) => {
    try {
      const tripId = req.body._id;
      const newMiles = req.body.newMiles;
      const newGallons = req.body.newGallons;
  
      const trip = await Trips.findOne({ _id: tripId });
  
      if (trip) {
        if (newMiles) {
          trip.miles = newMiles;
        }
        if (newGallons) {
          trip.gallons = newGallons;
        }
        await trip.save();
        res.redirect(`/?id=${tripId}`);
      } else {
        res.status(404).send('Trip not found.');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error updating trip data.');
    }
  });

app.get('/addTrip', (req, res) => {
  res.render('addTripForm');
});

app.post('/addTripData', async (req, res) => {
  try {
      const newTrip = new Trips({
          city: req.body.city,
          date: req.body.date,
          driver: req.body.driver,
          miles: req.body.miles,
          gallons: req.body.gallons
      });

      await newTrip.save();
      res.redirect(`/resultPage?id=${newTrip._id}`);
  } catch (error) {
      console.error(error);
      res.status(500).send('Error adding trip data.');
  }
});


app.get('/resultPage', async (req, res) => {
  try {
      const tripId = req.query.id;
      const trip = await Trips.findById(tripId);
      res.render('resultPage', { trip });
  } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving trip data.');
  }
});

app.get('/getCityForm', (req, res) => {
    res.render('getCityForm');
  });


app.get('/tripsByCity', async (req, res) => {
    try {
      const city = req.query.city.toLowerCase();
      const trips = await Trips.find({ city: { $regex: new RegExp(`^${city}$`, 'i') } });
      res.render('showAll.html', { trips });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving trips by city.');
    }
  });
  

app.post('/deleteTrip', async (req, res) => {
    try {
      const date = req.body.date;
      await Trips.deleteOne({ date: date });
      res.redirect('/');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error deleting trip.');
    }
  });
  
  

  app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));