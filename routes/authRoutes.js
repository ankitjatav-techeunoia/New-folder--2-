const express = require('express');
const passport = require('passport');
const checkAuth = require('../middlewares/CheckAuth');
const preventLoggedInAccess = require('../middlewares/checkUserLogout');
// const checkAuthLogout = require('../middlewares/checkUserLogout');
const router = express.Router();

// GitHub login route
router.get('/github',  passport.authenticate('github', { scope: ['user:email'] }));

router.get('/login',preventLoggedInAccess, (req, res) => {
    res.render('index');
  });

// GitHub callback route
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication
    res.redirect('/auth/dashboard'); // Redirect to dashboard or desired page
  }
);


router.get('/dashboard', checkAuth, (req, res) => {
    if (!req.isAuthenticated()) {
      return res.redirect('/auth/github');
    }
    console.log('Dashboard route',req.user);
    res.render('dashboard', { user: req.user });
  });



// Logout route
router.get('/logout', (req, res) => {
    console.log('Logout route');
  req.logout((err) => {
    if (err) {
      console.error('Error during logout:', err);
      return res.status(500).send('Error during logout');
    }
    res.redirect('/auth/login'); // Redirect to home or login page
  });
});

module.exports = router;
