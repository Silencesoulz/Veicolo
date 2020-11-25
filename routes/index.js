const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));
router.get('/welcome', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

//Load edit form
router.get('/edit/:id', function(req, res){
  User.findById(req.params.id, function(err, user){
    res.render('edit',{
      user:user
    });
  });
});

//Update edit
router.post('/edit/:id', function(req, res){
  let client ={};
  client.name = req.body.name;
  client.telephone = req.body.telephone;
  client.line = req.body.line;


  let query = {_id:req.params.id}

  User.update(query, client, function(err){
    if(err){
      console.log(err);
      return;
    } else {
      res.redirect('/dashboard');
    }
  });
});

router.get('/data', function(req, res, next){
  User.findById(req.params.id, function(err, user){
    res.render('data',{
      user:user
    });
  });
});

router.get('/error', function(req, res, next){
  User.findById(req.params.id, function(err, user){
    res.render('error',{
      user:user
    });
  });
});

router.get('/search', function(req, res, next){
  User.findById(req.params.id, function(err, user){
    res.render('search',{
      user:user
    });
  });
});

module.exports = router;
