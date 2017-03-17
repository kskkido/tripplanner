const router = require('express').Router()
const models = require('../models');

var Promise = require('bluebird');

const Place = models.Place;
const Hotel = models.Hotel;
const Activity = models.Activity;
const Restaurant = models.Restaurant;


router.get('/', function (reg, res, next) {
  Promise.all([Hotel.findAll(), Restaurant.findAll(),Activity.findAll()])
  .then(function(result){
    let hotels = result[0];
    let restaurants = result[1];
    let activities = result[2];
    res.render('index', {hotels: hotels, activities: activities, restaurants: restaurants})
  })
})

module.exports = router
