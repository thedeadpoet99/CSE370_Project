const express = require('express');
const router = express.Router();
const multer = require('multer'); // For handling file uploads
const path = require('path');
const fs = require('fs');
const mysql = require('mysql')

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cse370project' // Change this to your database name
});


  
  // Multer setup for file uploads
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
      const newFilename = req.session.username + '.jpg';
    cb(null, newFilename);
    }
  });
  const upload = multer({ storage: storage });

  

  // GET route to display cosplay competition page
// ... Other imports and code ...

// GET route to display cosplay competition page
router.get('/cosplay_competition', (req, res) => {
  const userId = req.session.userId;
  const username = req.session.userId

  // Fetch participants' data from the database
  const participantsQuery = `
    SELECT c.contestid, u.username, c.name, c.photos, COUNT(v.whom) AS voteCount
    FROM cosplay_competition c
    INNER JOIN users u ON c.contestid = u.id
    LEFT JOIN thevotes v ON c.contestid = v.whom
    GROUP BY c.contestid, u.username, c.name, c.photos
  `;

  db.query(participantsQuery, (err, participants) => {
    if (err) {
      console.error('Error fetching cosplay competition data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Loop through the participants and populate the imageDataUrl
    participants.forEach(participant => {
      // You can directly use the 'photos' column assuming it contains valid image URLs
      // No need to convert to data URL
      participant.imageDataUrl = participant.photos;
      // Check if the user has voted for this contestant
    
    });

    let maxVotes = 0;
    let winners = [];

    participants.forEach(participant => {
      if (participant.voteCount > maxVotes) {
        maxVotes = participant.voteCount;
        winners = [participant.name];
      } else if (participant.voteCount === maxVotes) {
        winners.push(participant.name);
      }
    });


    res.render('cosplay_competition', { participants, userId, username, winners });
  });
});

// ... Other routes and code ...


  



router.post('/cosplay_competition/upload', (req, res) => {
  const userId = req.session.userId; // Assuming the user ID is stored in the session
  const { photoUrl } = req.body;

  // Fetch the user's name based on the logged-in user's ID from the users table
  const getUserNameQuery = 'SELECT username FROM users WHERE id = ?';
  db.query(getUserNameQuery, [userId], (err, userResult) => {
    if (err) {
      console.error('Error fetching user name:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (userResult.length === 0) {
      res.status(400).send('User not found'); // Handle case where user does not exist
      return;
    }

    const username = userResult[0].username;

    // Insert participant data into the cosplay_competition table
    const insertQuery = 'INSERT INTO cosplay_competition (contestid, name, photos) VALUES (?, ?, ?)';
    db.query(insertQuery, [userId, username, photoUrl], (err, result) => {
      if (err) {
        console.error('Error inserting participant data:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.redirect('/cosplay_competition'); // Redirect to the cosplay competition page after successful insertion
      }
    });
  });
});



  
  // POST route to handle voting
  router.post('/cosplay_competition/vote', (req, res) => {
    const voterId = req.session.userId;
    const contestantId = req.body.contestantId;
  
    if (voterId === contestantId) {
      res.status(400).send('You cannot vote for yourself.');
      return;
    }
  
    // Check if the user has already voted for this contestant
    const checkVoteQuery = 'SELECT * FROM thevotes WHERE who = ? AND whom = ?';
    db.query(checkVoteQuery, [voterId, contestantId], (err, voteResult) => {
      if (err) {
        console.error('Error checking vote:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      if (voteResult.length > 0) {
        // Show a message and redirect if the user has already voted
        res.send('<script>alert("You have already voted for this contestant."); window.location.href = "/cosplay_competition";</script>');
      } else {
        // Insert the vote into the database
        const insertVoteQuery = 'INSERT INTO thevotes (who, whom) VALUES (?, ?)';
        db.query(insertVoteQuery, [voterId, contestantId], (err, result) => {
          if (err) {
            console.error('Error inserting vote:', err);
            res.status(500).send('Internal Server Error');
          } else {
            res.redirect('/cosplay_competition'); // Redirect to the cosplay competition page after successful vote
          }
        });
      }
    });
  });


  
  router.post('/anime/vote', (req, res) => {
    const userId = req.session.userId; // Assuming user ID is stored in session
    const animeId = req.body.animeId; // Assuming you get animeId from the request body
  
    // Check if the user has already voted for this anime
    const checkVoteQuery = 'SELECT * FROM anime_contest WHERE animeid = ? AND userwhohasvoted = ?';
    db.query(checkVoteQuery, [animeId, userId], (err, voteResult) => {
      if (err) {
        console.error('Error checking vote:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      if (voteResult.length > 0) {
        // User has already voted for this anime, show a message
        res.send('You have already voted for this anime.');
      } else {
        // Insert the vote into the anime_contest table
        const insertVoteQuery = 'INSERT INTO anime_contest (animeid, animename, userwhohasvoted) SELECT animeid, name, ? FROM anime WHERE animeid = ?';
        db.query(insertVoteQuery, [userId, animeId], (err, insertResult) => {
          if (err) {
            console.error('Error inserting vote:', err);
            res.status(500).send('Internal Server Error');
          } else {
            res.send('Vote successfully added.');
          }
        });
      }
    });
  });

  router.get('/anime_contest', (req, res) => {
    // Fetch distinct anime names with the count of appearance (number of votes)
    const getAnimeContestQuery = `
    SELECT a.animeid, a.name AS animename, COUNT(ac.animeid) AS numofvotes
    FROM anime_contest ac
    INNER JOIN anime a ON ac.animeid = a.animeid
    GROUP BY ac.animeid, a.name
    ORDER BY numofvotes DESC
    LIMIT 10
  `;
  
    db.query(getAnimeContestQuery, (err, contestData) => {
      if (err) {
        console.error('Error fetching anime contest data:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      // Render the anime contest page and pass the contestData
      res.render('anime_contest', { contestData });
    });
  });
  
  

  
  module.exports = router;