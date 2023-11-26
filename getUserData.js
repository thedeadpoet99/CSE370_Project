const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const session = require('express-session');
const app = express();
const userRoutes = require('./routes/userRoutes');
const path = require('path');




const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cse370project'
});
const getUserData = (userId, callback) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    
    connection.query(query, [userId], (err, results) => {
      if (err) {
        // Handle the error
        return callback(err, null);
      }
      
      if (results.length === 0) {
        // No user found with the provided userId
        return callback(null, null);
      }
  
      const userData = results[0];
      callback(null, userData);
    });
  };

  module.exports = getUserData;