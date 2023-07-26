const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Auth = require('../Model/user'); 


// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { username, password} = req.body;

    const existingUser = await Auth.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists. Please choose a different one.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Auth({ username, password: hashedPassword });
    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User registered successfully.', userId: savedUser._id });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user.' });
  }
};

// User login
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

   
    const user = await Auth.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const token = jwt.sign({ username: user.username, userId: user._id }, '1234567', {
      expiresIn: '1h', 
    });

    res.status(200).json({ token:token, userId:user._id });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Failed to login.' });
  }
};


