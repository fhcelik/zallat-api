# vintri-api

The server fetchs data from external api, https://www.eia.gov/opendata/qb.php?category=2251609 and gives rates the data.  

yarn start -> executing server

# Database -> MongoDB in ATLAS
There are a collection in database which has 5 set data from child series on this page: https://www.eia.gov/opendata/qb.php?category=2251609.

# Questions 
1. Can return “Electric power carbon dioxide emission quantity from some state from
some year”.
    a. For example: given params of year:2000, state:California. It should return 2.103701
    
API : http://localhost:5000/emission/?year=2000&state=California

2. If for each million metric tons of “Electric power carbon dioxide emission” from coal
consumed, the state government need to pay tax of 1 million dollars. Please create an
API that with params of from, to, state, that returns the total tax that the state
government paid in that period.
    a. For example: given from: 2003, to:2006, state: California. It should return
        8.306344million or 8.3 million
API: http://localhost:5000/emission/tax?state=California&from=2003&to=2006

3. (Bonus) Please create a NOSQL MongoDB in any cloud. To save at least 5 set data from
child series on this page: https://www.eia.gov/opendata/qb.php?category=2251609
And add another end point that can return the state that has the highest CO2 emission
in a given period (from, to will be given as params)

API: http://localhost:5000/emission/highest?from=2003&to=2006
