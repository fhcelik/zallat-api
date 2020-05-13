'use strict';
const R = require('ramda');

exports.propsOfBeers = beers =>{
    const arrayOfBeerProps = R.prop('data',beers);
    const beer = R.map(R.pick(['id', 'name', 'description', 'first_brewed', 'food_pairings']), arrayOfBeerProps);
    
    return beer;
}