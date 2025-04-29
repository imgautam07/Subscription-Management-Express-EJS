const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

router.get('/register', (req, res) => {
  res.render('auth/register');
});

router.post('/register', async (req, res) => {
  try {
    const { phoneNumber, password, age, monthlyIncome } = req.body;
    const user = new User({ phoneNumber, age, monthlyIncome });
    
    const registeredUser = await User.register(user, password);
    
    req.login(registeredUser, err => {
      if (err) {
        req.flash('error', err.message);
        return res.redirect('/register');
      }
      req.flash('success', 'Welcome to Subscription Management System!');
      res.redirect('/subscriptions');
    });
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/register');
  }
});

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/subscriptions',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) {
      return next(err);
    }
    req.flash('success', 'Successfully logged out!');
    res.redirect('/login');
  });
});

module.exports = router;
