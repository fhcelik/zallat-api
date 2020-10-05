'use strict';

const {
    getCollection,
  } = require('../db');

const getEmissionsCollection = () =>  getCollection('emissions');

const findEmission = (input, fromYear, toYear) =>
{  let max = 0; 
    for (let i=0; i<input.length; i++)
    {
        if(input[i][0] >= fromYear && input[i][0] <= toYear && input[i][1] > max){
            max = input[i][1];
            
        }
    }

    return max;
}

const findHihgest = (props, fromYear, toYear) => {
    let max = 0, name = '', state = '';

    for (let i=0; i<props[0].series.length;i++){
        const value = findEmission(props[0].series[i].data, fromYear, toYear)
        if ( value > max){
            max = value;
            name = props[0].series[i].name
        }
    }

    state = name.split(" ");

    return state[state.length-1];                         
}
    
               

exports.valueOfEmission = (props, year) =>{
    const { data } = props.data.series[0];
    const emission = data.filter(emissions => emissions[0] == year && emissions[1]); 

    return emission[0][1];
}

exports.calculateTax = (props, fromYear, toYear) => {
    const { data } = props.data.series[0];

    return `${data.filter( emissions => emissions[0]<=toYear  && emissions[0]>=fromYear)
               .reduce((acc, emission) => acc+Number(emission[1]), 0)} million`;
}

exports.highestEmission = (fromYear, toYear) =>
    getEmissionsCollection()
        .then(emission => emission.find().toArray())
        .then(props => findHihgest(props, fromYear, toYear))        
