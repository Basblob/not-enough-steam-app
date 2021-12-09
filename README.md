# Installation Instructions:

## Install node
    nvm use 16.13.0
  
## Install npm packages
    cd server/
    npm i
    cd ../client/
    npm i
    
## Get a Steam API KEY and add it to the env file
1. Go to https://steamcommunity.com/dev/apikey
2. Sign up with a steam account, or create one if you don't already have one.
3. Copy the API key

## Create a .env file by copying the .env.sample file provided
- Replace the empty value of "API_KEY=" with your steam API key
  
## Start the server
    cd server
    node server.js
    
## Start the react app 
    cd client
    npm start
    
    
