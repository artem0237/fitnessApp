const authService = require('../services/authService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
  getLogin: (req, res) => {
    res.render('login', { error: null });
  },

  postLogin: async (req, res) => {
    const { username, password } = req.body;
    const user = authService.getUserByUsername(username);

    if (!user) {
      return res.render('login', { error: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render('login', { error: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: false, 
      maxAge: 3600000, 
    });

    res.redirect('/goals');
  },

  getRegister: (req, res) => {
    res.render('register', { error: null });
  },

  postRegister: async (req, res) => {
    const { username, email, password } = req.body;
    const existingUser = authService.getUserByUsername(username);

    if (existingUser) {
      return res.render('register', { error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: `user_${Date.now()}`,
      username,
      email,
      password: hashedPassword,
    };

    authService.createUser(newUser);

    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000,
    });

    res.redirect('/goals');
  },

  logout: (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/login');
  },
};

module.exports = authController;