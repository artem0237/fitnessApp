const jwt = require('jsonwebtoken');
const authService = require('../services/authService');

const authMiddleware = {
  requireAuth: (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
      return res.redirect('/login');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = authService.getUserById(decoded.userId);
      if (!user) {
        return res.redirect('/login');
      }
      req.user = user; 
      next();
    } catch (error) {
      console.error('JWT verification failed:', error);
      return res.redirect('/login');
    }
  },

  redirectIfAuth: (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = authService.getUserById(decoded.userId);
        if (user) {
          return res.redirect('/goals');
        }
      } catch (error) {
      }
    }
    next();
  },
};

module.exports = authMiddleware;