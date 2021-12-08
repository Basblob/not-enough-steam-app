const fs = require("fs");
const gamesData = require("./data/AllGamesFromAPI.json");


let newList = gamesData.map((game) => {
  return {
    value: game.name.toLowerCase(),
    label: game.name,
    appid: game.appid,
  };
});
console.log(newList);
fs.writeFileSync('./data/AllGamesFromAPIFormatted.json', JSON.stringify(newList))