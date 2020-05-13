'use strict';
const R = require('ramda');

exports.propsOfBeers = beers =>{
    const arrayOfBeerProps = R.map(
            R.pick(['id', 'name', 'description', 'first_brewed', 'food_pairings']), 
            R.prop('data',beers)
        );
    
    return arrayOfBeerProps;
}