const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const session = require('express-session');
const app = express();
const userRoutes = require('./routes/userRoutes');
const path = require('path');
const functionroutes = require('./routes/functionRoutes')
const ccRoutes = require('./routes/ccRoutes');



const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cse370project'
});


app.use(session({
  secret: '123abcde2er2', // Replace with a random string in production
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));


connection.connect(err => {
  if (err) throw err;
  console.log('Connected to the database');
});




const PORT = process.env.PORT || 3000;

// Mock database
const usersDB = {};

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/user', userRoutes);
// mamun functionroutes
app.use('',functionroutes)
app.use('', ccRoutes);
// THIS PART MODIFIED- SHREYA
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));



app.get('/', (req,res) =>{
  res.redirect('/user/home');
})


app.get('/profile', (req, res) => {
 if (req.session.userId) {
   connection.query('SELECT * FROM users WHERE ID = ?', [req.session.userId], (err, results) => {
     if (err) throw err;
      res.render('profile', { username: results[0].username,role: results[0].role });
    });
  } else {
    res.redirect('/user/login');
  }
});

//Added-Moiukh on 18/8/23



//NEW PART ADDED-SHREYA

app.get('/user/wishlist', (req, res) => {
  if (req.session.userId) {
    connection.query(
      'SELECT a.name, a.studio, a.start_date, a.description '+
      'FROM anime a '+
      'JOIN add_anime aa ON a.name = aa.animename '+
      'JOIN list l ON aa.listid = l.id '+
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

// Watchlist Route
app.get('/user/watchlist', (req, res) => {
  if (req.session.userId) {
    connection.query(
      'SELECT a.name, a.studio, a.start_date, a.description '+
      'FROM anime a '+
      'JOIN add_anime aa ON a.name = aa.animename '+
      'JOIN list l ON aa.listid = l.id '+
      'WHERE l.userid = ? AND l.type = "watchlist"',
      [req.session.userId],
      (err, watchlistResults) => {
        if (err) throw err;
        res.render('watchlist', { watchlist: watchlistResults, username: req.session.username  });
      }
    );
  } else {
    res.redirect('/user/login');
  }
});



app.get('/user/eventlist', (req, res) => {
  if (req.session.userId) {
    connection.query('SELECT * FROM interested_events WHERE user_id = ? ',
      [req.session.userId],
      (err, watchlistResults) => {
        if (err) throw err;
        res.render('event_list', { eventlist: watchlistResults, username: req.session.username  });
      }
    );
  } else {
    res.redirect('/user/login');
  }
});


app.post('/user/add_event',(req,res) =>{
  const { eventName, eventYear } = req.body;
  const userId = req.session.userId;

  connection.query('INSERT INTO interested_events (eventName,eventYear,user_id) VALUES (?,?,?)',[eventName,eventYear,userId], (err) =>{
    if (err) throw err;
    res.redirect('/events')
  })

})

app.get('/events/add',(req,res) => {
  const user  = req.session.userId

  if (user) {
    res.render('add_events')
  }else{
    res.redirect('/profile')
  }
})

app.post('/user/eventdelete',(req,res) =>{
  const { eventName} = req.body;
  const userId = req.session.userId;

  connection.query('DELETE FROM interested_events WHERE user_id = ? AND eventName = ?',[userId,eventName], (err) =>{
    if (err) throw err;
    res.redirect('/user/eventlist')
  })

})

app.get('/anime', (req, res) => {
  connection.query('SELECT * FROM anime', (err, animeResults) => {
    if (err) throw err;
    res.render('anime', { animeList: animeResults, username: req.session.userId });
  });
});


// ... (your existing code)
app.get('/data', (req,res) => {
   res.send(usersDB)
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
