const express = require('express')
const router = express.Router()
const mysql = require('mysql')




const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cse370project' // Change this to your database name
  });

  db.connect(err => {
    if (err) {
      throw err;
    }
    console.log('Connected to MySQL database');
  });
  router.get('/anime', (req, res) => {
    const query = 'SELECT * FROM Anime';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching anime data: ' + err.message);
        return;
      }
      const userId = req.session.userId
      res.render('anime', { anime: results, username: req.session.userId });
    });
  });

  router.get('/manga', (req, res) => {
    const query = 'SELECT * FROM manga';
    db.query(query, (err, results) => {
        if (err) throw err;

        res.render('show-manga', { mangas: results });
      });
  });

 router.get('/movies', (req, res) => {
    const query = 'SELECT * FROM movies';
    db.query(query, (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Error fetching movie data' });
      } else {
        res.render('movies', { movies: results });
      }
    });
  });

router.get('/series', (req, res) => {
    const query = 'SELECT * FROM series';
    db.query(query, (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Error fetching series data' });
      } else {
        res.render('series', { series: results });
      }
    });
  });
  


  
  
  router.get('/events',  (req, res) => {
    const query = 'SELECT * FROM events'; // Create an "events" table in your database
    db.query(query, (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Error fetching event data' });
      } else {
        res.render('events', { events: results}); // Pass userIsAdmin as false
      }
    });
  });
  



  function generateRandomEventID() {
    const min = 100;
    const max = 999;
    const randomThreeDigitNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    const eventID = `event${randomThreeDigitNumber}`;
    return eventID;
  }
  
  router.post('/events', (req, res) => {
    const { name, year, location, date, ticket_price, attraction, image_url } = req.body;
    const id = generateRandomEventID()
    const userId = req.session.userId
    console.log("tausif",req.body, userId)



    if (userId) {
      const query = 'INSERT INTO events (id,name, year, location, date, ticket_price, Attraction, image_url) VALUES (?, ?, ?, ?, ?, ?, ?,?)';
      db.query(query, [id,name, year, location, date, ticket_price, attraction, image_url], (err, result) => {
        if (err) {
          console.log(err)
          res.status(500).json({ error: 'Error adding event data' });
        } else {
          res.redirect('/events'); // Redirect to the events page after successful insertion
        }
      });
    }
    

  });
  
  module.exports = router;