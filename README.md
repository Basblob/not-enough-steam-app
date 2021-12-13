# NotEnoughSteam
Not enough steam is a fun app designed to give gamers a look into what games other people are playing on steam.

This app uses calls to the Steam Web API, as well as Steam's storefront API in order to gather information about games and players, and sort that data into a way that's easily accessible through a 3D force-directed graph visualization. Users are able to search up games, and see what people who play that game are also playing.

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
    
    
