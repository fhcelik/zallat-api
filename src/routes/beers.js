'use strict';

const router = require('express').Router();
const axios = require('axios');
const R = require('ramda');
const { propsOfBeers } = require('../facade/beers')

router.get('/', (req, res, next) => {
  const {q: beerName} = req.query;

  axios.get('https://api.punkapi.com/v2/beers?', 
  { headers: {
      'x-ratelimit-limit': 3600,
      'x-ratelimit-remaining': 3587
    },
    params: {
      'beer_name':beerName
    }
  })
  .then(propsOfBeers)
  .then(props => res.json(props))
  .catch(next)
});


module.exports = router;