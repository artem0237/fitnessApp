const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const goalRoutes = require('./routes/goalsRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware');
require('dotenv').config();
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(cookieParser());

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('home', { user: req.user });
});

app.use('/goals', authMiddleware.requireAuth, goalRoutes); 
app.use('/', authRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});