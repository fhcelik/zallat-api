'use strict';

const axios = require('axios');
const cache = require('memory-cache');
const R = require('ramda');
const router = require('express').Router();
const { propsOfBeers } = require('../facade/beers')



/**
 * @swagger
 *
 * /Beers:
 *   get:
 *     description: Returns beers from external Punk Api
 *     summary: Get beers
 *     tags: ['Beers']
 *     responses:
 *       200:
 *         description: a map of beers by their beer Name's
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  id:
 *                    type: number
 *                  name:
 *                    type: string
 *                  description:
 *                    type: string
 *                  first_brewed:
 *                    type: string
 *                  food_pairing:
 *                    type: string
 *               required:
 *                  - id
 *                  - name
 *                  - description
 *                  - first_brewed
 *                  - food_pairing
 *       500:
 *         $ref: '#/components/responses/Undefined'
 */
  router.get('/', (req, res, next) => {
    const {q: beerName} = req.query;

    if(cache.get(beerName)){
      res.json(cache.get(beerName));
    }
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
    .then(props => {
      cache.put(beerName,props,3600);
      res.json(props);
    })
    .catch(next)
  });

module.exports = router;