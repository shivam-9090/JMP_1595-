// app.js

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Dummy user data (in real-world, use a database for user storage)
const users = {
  'admin': 'password',
  'user1': '12345'
};

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files (CSS, JS, images)
app.use(express.static('public'));

// Route for serving the login form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.php');
});

// Route for handling login form submission
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (users[username] && users[username] === password) {
    res.send(`Welcome, ${username}!`);
  } else {
    res.send('Invalid username or password. Please try again.');
  }
});

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
