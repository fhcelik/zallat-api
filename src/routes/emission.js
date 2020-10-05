'use strict';

const axios = require('axios');
const router = require('express').Router();
const  stateCodes  = require('./util/stateCodes');
const { calculateTax, highestEmission, valueOfEmission } = require('../facade/emission')

  router.get('/', (req, res, next) => {
    const {year: year, state: state} = req.query;

    if(!(year && state)) next(error);

    const stateCode = stateCodes[state.toUpperCase()];

    axios.get('http://api.eia.gov/series/', 
    {
      params: {
        "api_key": "f8c39d1a3ce44b9772f00aa5ad65de14",
        "series_id": `EMISS.CO2-TOTV-EC-CO-${stateCode}.A`,
      }
    })
    .then(props => 
        res.json(valueOfEmission(props, year))
      )
    .catch(next)
  });


  router.get('/tax', (req, res, next) => {
    const {from: fromYear, to: toYear, state: state} = req.query;
    const stateCode = stateCodes[state.toUpperCase()];

    if(!(fromYear && toYear && state)) next(error);

    axios.get('http://api.eia.gov/series/', 
    {
      params: {
        "api_key": "f8c39d1a3ce44b9772f00aa5ad65de14",
        "series_id": `EMISS.CO2-TOTV-EC-CO-${stateCode}.A`,
      }
    })
    .then(props => 
        res.json(calculateTax(props, fromYear, toYear))
      )
    .catch(next)
  });

  router.get('/highest', (req, res, next) => {
    const {from: fromYear, to: toYear } = req.query; 
    
    if(!(fromYear && toYear)) next(error);

    highestEmission(fromYear, toYear)
      .then(highestEmission => { 
          res.json(highestEmission)
      })
      .catch(next)
  });
module.exports = router;