// app.js

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/loginSystem', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
const db = mongoose.connection;

// Mongo error handling
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define a schema for User
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String
});

// Create User model
const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: db })
}));

// Serve static files (not needed for this example, but added for completeness)
app.use(express.static('public'));

// Route for serving the login form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Route for handling user registration
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).send('Username already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword
    });

    await newUser.save();
    res.send('Registration successful');
  } catch (error) {
    res.status(500).send('Error registering user');
  }
});

// Route for handling user login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user in the database
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send('User not found');
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).send('Invalid password');
    }

    // Store user session
    req.session.user = user;
    res.send('Login successful');
  } catch (error) {
    res.status(500).send('Error logging in');
  }
});

// Route for logging out
app.post('/logout', (req, res) => {
  req.session.destroy();
  res.send('Logout successful');
});

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
