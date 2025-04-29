const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');
const { isLoggedIn } = require('../middleware/auth');

router.get('/', isLoggedIn, async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ user: req.user._id });
    res.render('subscriptions/index', { subscriptions });
  } catch (err) {
    req.flash('error', 'Something went wrong!');
    res.redirect('/');
  }
});

router.get('/new', isLoggedIn, (req, res) => {
  res.render('subscriptions/new');
});

router.post('/', isLoggedIn, async (req, res) => {
  try {
    const { plan, cost, startDate, endDate } = req.body;
    const newSubscription = new Subscription({
      plan,
      cost,
      startDate,
      endDate,
      user: req.user._id
    });
    
    await newSubscription.save();
    
    req.user.subscriptions.push(newSubscription);
    await req.user.save();
    
    req.flash('success', 'Successfully created subscription!');
    res.redirect('/subscriptions');
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/subscriptions/new');
  }
});

router.get('/:id', isLoggedIn, async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id).populate('user');
    
    if (!subscription) {
      req.flash('error', 'Subscription not found');
      return res.redirect('/subscriptions');
    }
    
    if (!subscription.user._id.equals(req.user._id)) {
      req.flash('error', 'You do not have permission to view this subscription');
      return res.redirect('/subscriptions');
    }
    
    res.render('subscriptions/show', { subscription });
  } catch (err) {
    req.flash('error', 'Something went wrong!');
    res.redirect('/subscriptions');
  }
});

router.get('/:id/edit', isLoggedIn, async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    
    if (!subscription) {
      req.flash('error', 'Subscription not found');
      return res.redirect('/subscriptions');
    }
    
    if (!subscription.user.equals(req.user._id)) {
      req.flash('error', 'You do not have permission to edit this subscription');
      return res.redirect('/subscriptions');
    }
    
    res.render('subscriptions/edit', { subscription });
  } catch (err) {
    req.flash('error', 'Something went wrong!');
    res.redirect('/subscriptions');
  }
});

router.put('/:id', isLoggedIn, async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    
    if (!subscription) {
      req.flash('error', 'Subscription not found');
      return res.redirect('/subscriptions');
    }
    
    if (!subscription.user.equals(req.user._id)) {
      req.flash('error', 'You do not have permission to update this subscription');
      return res.redirect('/subscriptions');
    }
    
    const originalPlan = subscription.plan;
    
    subscription.cost = req.body.cost;
    subscription.startDate = req.body.startDate;
    subscription.endDate = req.body.endDate;
    
    await subscription.save();
    
    req.flash('success', 'Successfully updated subscription!');
    res.redirect('/subscriptions/' + req.params.id);
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/subscriptions');
  }
});

router.delete('/:id', isLoggedIn, async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    
    if (!subscription) {
      req.flash('error', 'Subscription not found');
      return res.redirect('/subscriptions');
    }
    
    if (!subscription.user.equals(req.user._id)) {
      req.flash('error', 'You do not have permission to delete this subscription');
      return res.redirect('/subscriptions');
    }
    
    await Subscription.findByIdAndDelete(req.params.id);
    
    const userIndex = req.user.subscriptions.indexOf(req.params.id);
    if (userIndex > -1) {
      req.user.subscriptions.splice(userIndex, 1);
      await req.user.save();
    }
    
    req.flash('success', 'Successfully deleted subscription!');
    res.redirect('/subscriptions');
  } catch (err) {
    req.flash('error', 'Something went wrong!');
    res.redirect('/subscriptions');
  }
});

module.exports = router;
