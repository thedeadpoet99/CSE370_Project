const express = require('express');
const router = express.Router();


const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cse370project'
  });


router.post('/register', (req, res) => {
  const { username, password, joiningDate, email, dob } = req.body;

  connection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) throw err;

    if (results.length) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // You may want to hash the password here using a library like bcrypt

    connection.query(
      'INSERT INTO users (username, password, joining_date, email, dob, role) VALUES (?, ?, ?, ?, ?, ?)',
      [username, password, joiningDate, email, dob, 'client'],
      (err, results) => {
        if (err) throw err;
        res.json({ message: 'Registration successful' });
      }
    );
  });
});


  router.get('/register', (req, res) => {
    
    res.render('register', { username: req.session.userId });
  });
  
  

   

// Login endpoint
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(req.body)
    connection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
      if (err) throw err;

  
      if (results.length && results[0].password === password) {
        req.session.userId = results[0].id; // Store the user's ID in the session
        req.session.username = results[0].username
        res.redirect('/user/home');
      } else {
        res.status(401).json({ message: 'Invalid username or password' });
      }
    });
  });


  router.get('/login', (req, res) => {
    // Check if the user is already logged in (session contains userId)
    if (req.session.userId) {
      // User is already logged in, redirect to profile or another page
      res.redirect('/profile');
    } else {
      // User is not logged in, render the login page
      res.render('login', { username: req.session.userId });
    }
  });


router.get('/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) throw err;
      res.redirect('/user/login');
    });
  });




  router.get('/home', (req, res) => {
    const username = req.session.username; // Assuming you store the username in the session
    res.render('home', { username: username });
  });
  
  
  router.post('/delete-profile', (req, res) => {
    // You may want to add additional validation and confirmation steps here
    const userId = req.session.userId; // Assuming you store user ID in the session
    connection.query('DELETE FROM users WHERE id = ?', [userId], (err, result) => {
      if (err) throw err;
      req.session.destroy(err => {
        if (err) throw err;
        res.redirect('/user/login'); // Redirect to login after successful deletion
      });
    });
  });

// SHREYA'S PART FOR WISHLIST AND WATCHLIST


// userRoutes.js
router.get('/profile', (req, res) => {
     const userId = req.session.user ; // Adjust this based on your session handling method
  
     connection.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
       if (err) throw err;
  
       if (results.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
       const user = results[0];
  
       // Render the 'profile' template and pass the user data
       res.render('profile', { user });
     });
   });

// userRoutes.js
router.post('/update-list-type', (req, res) => {
  const { animename } = req.body;

  // Assuming you have already retrieved the user's ID
  const userId = req.session.userId;

  // Check if the anime is already in the watchlist for the user
  const checkQuery =
    'SELECT aa.animename ' +
    'FROM add_anime aa ' +
    'JOIN list watchlist ON aa.listid = watchlist.id ' +
    'WHERE aa.animename = ? ' +
    'AND watchlist.userid = ? ' +
    'AND watchlist.type = "watchlist"';

  connection.query(checkQuery, [animename, userId], (err, existingResults) => {
    if (err) {
      throw err;
    } else if (existingResults.length > 0) {
      // The anime is already in the watchlist, remove it from the wishlist
      const removeFromWishlistQuery =
      'DELETE FROM add_anime ' +
      'WHERE listid IN ( ' +
      '  SELECT id FROM list ' +
      '  WHERE userid = ? AND type = "wishlist"' +
      ') AND animename = ?'

      connection.query(removeFromWishlistQuery, [userId, animename], (removeErr, removeResults) => {
        if (removeErr) {
          throw removeErr;
        } else {
          res.redirect('/user/wishlist'); // Redirect back to the wishlist page
        }
      });
    } else {
      // Update the list type for the given anime
      const updateQuery =
        'UPDATE add_anime aa ' +
        'JOIN list wishlist ON aa.listid = wishlist.id ' +
        'JOIN list watchlist ON watchlist.userid = wishlist.userid AND watchlist.type = "watchlist" ' +
        'SET aa.listid = watchlist.id ' +
        'WHERE aa.animename = ? ' +
        'AND wishlist.userid = ? ' +
        'AND wishlist.type = "wishlist"';

      connection.query(updateQuery, [animename, userId], (updateErr, updateResults) => {
        if (updateErr) {
          throw updateErr;
        } else {
          res.redirect('/user/wishlist'); // Redirect back to the wishlist page
        }
      });
    }
  });
});




router.post('/delete-item-wishlist', (req, res) => {
  const { animename } = req.body;
  // You may want to add additional validation and confirmation steps here
  const userId = req.session.userId; // Assuming you store user ID in the session
  connection.query('DELETE FROM add_anime ' +
  'WHERE listid IN ( ' +
  '  SELECT id FROM list ' +
  '  WHERE userid = ? AND type = "wishlist"' +
  ') AND animename = ?', [userId,animename], (err, result) => {
    
         if (err) {
            throw err;
         } else {
             res.redirect('/user/wishlist'); // Redirect back to the wishlist page
           }
        });
});

router.post('/delete-item-watchlist', (req, res) => {
  const { animename } = req.body;
  
  const userId = req.session.userId; 
  connection.query('DELETE FROM add_anime ' +
  'WHERE listid IN ( ' +
  '  SELECT id FROM list ' +
  '  WHERE userid = ? AND type = "watchlist"' +
  ') AND animename = ?', [userId,animename], (err, result) => {
    
         if (err) {
            throw err;
         } else {
             res.redirect('/user/watchlist'); 
           }
        });
});

router.post('/update-watchlist-status', (req, res) => {
  const { animename, status } = req.body;
  const userId = req.session.userId; 
  const sql = 'UPDATE add_anime aa JOIN list l ON aa.listid = l.id JOIN anime a ON aa.animename = a.name SET aa.watchlist_status = ?  WHERE l.userid = ?  AND l.type = "watchlist" AND a.name = ? ';

  connection.query(sql, [status, userId, animename], (err, results) => {
    if (err) throw err;
    console.log(`Updated watchlist_status for ${animename} to ${status}`);
    res.redirect('/user/watchlist'); 
  });
});

router.get('/user/wishlist', (req, res) => {
  if (req.session.userId) {
    connection.query(
      'SELECT DISTINCT a.name, a.studio, a.start_date, a.description '+
      'FROM anime a'+
      'JOIN add_anime aa ON a.name = aa.animename'+
      'JOIN list l ON aa.listid = l.id'+
      'WHERE l.userid = ? AND l.type = "wishlist"',
      [req.session.userId],
      (err, wishlistResults) => {
        if (err) throw err;
        
        res.render('wishlist', { wishlist: wishlistResults, username: req.session.username  });
      }
    );
  } else {
    res.redirect('/user/login');
  }
});

router.post('/add-to-list', (req, res) => {
  const { animename, listType } = req.body;
  const userId = req.session.userId;

  connection.query('SELECT id FROM list WHERE userid = ? AND type = ?', [userId, listType], (err, listResults) => {
    if (err) throw err;

    if (listResults.length > 0) {
      const listId = listResults[0].id;

      // Check if the anime is already in the list
      connection.query('SELECT animename FROM add_anime WHERE listid = ? AND animename = ?', [listId, animename], (err, animeResults) => {
        if (err) throw err;

        if (animeResults.length > 0) {
          // Anime is already in the list, show a message
          if (listType === 'watchlist') {
            res.render('anime_added', { message: 'Anime is already in the watchlist.', animename: animename });
          } else {
            res.render('anime_added', { message: 'Anime is already added to the list :)' });
          }
        } else {
          // Check if the anime is in the other list
          const otherListType = listType === 'wishlist' ? 'watchlist' : 'wishlist';
          connection.query('SELECT listid FROM add_anime WHERE animename = ? AND listid IN (SELECT id FROM list WHERE userid = ? AND type = ?)', [animename, userId, otherListType], (err, otherListResults) => {
            if (err) throw err;

            if (otherListResults.length > 0) {
              // Anime is in the other list, show a message
              if (listType === 'watchlist') {
                res.render('anime_added_wishlist', { message: 'Anime is already in the wishlist. You can move it to the watchlist.', animename: animename });
              } else {
                res.render('anime_added', { message: 'Anime is already added to the watchlist :)' });
              }
            } else {
              // Anime is not in either list, add it to the list
              connection.query('INSERT INTO add_anime (animename, listid) VALUES (?, ?)', [animename, listId], (err) => {
                if (err) throw err;
                res.redirect('/anime');
              });
            }
          });
        }
      });
    } else {
      // If the user doesn't have a list of the selected type, create one and then insert the anime
      connection.query('INSERT INTO list (userid, type) VALUES (?, ?)', [userId, listType], (err, insertResult) => {
        if (err) throw err;

        const listId = insertResult.insertId;

        connection.query('INSERT INTO add_anime (animename, listid) VALUES (?, ?)', [animename, listId], (err) => {
          if (err) throw err;
          res.redirect('/anime');
        });
      });
    }
  });
});



// Route to render the watchlist page
// router.get('/user/watchlist', (req, res) => {
//   if (req.session.userId) {
//     connection.query(
//       'SELECT a.name, a.studio, a.start_date, a.description ' + // Include user information columns
//       'FROM anime a ' +
//       'JOIN add_anime aa ON a.name = aa.animename ' +
//       'JOIN list l ON aa.listid = l.id ' +
//       'JOIN users u ON l.userid = u.id ' + // Join with the users table
//       'WHERE l.userid = ? AND l.type = "watchlist"',
//       [req.session.userId],
//       (err, watchlistResults) => {
//         if (err) throw err;
//         console.log(watchlistResults);
//         res.render('watchlist', { watchlist: watchlistResults, username: req.session.username });
//       }
//     );
//   } else {
//     res.redirect('/user/login');
//   }
// });



module.exports = router;
