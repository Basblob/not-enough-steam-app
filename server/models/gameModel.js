const { default: axios } = require("axios"),
  path = require("path"),
  key = "9AC94E4A61E63CCF470E57C5A0688534",
  steam_private = "https://api.steampowered.com",
  steam_public = "https://store.steampowered.com",
  steam_spy = "https://steamspy.com/api.php";

class gamePlayed {
  constructor(gameName, gameID) {
    this.name = gameName;
    this.appID = gameID;
    this.occurences = 0;
  }

  incrementOccurences() {
    this.occurences++;
  }
}

pullUserListByGameID = async (appID, numUsers) => {
  const playersList = axios
    .get(`${steam_public}/appreviews/${appID}?json=1`)
    .then((r) => {
      let reviewsAsList = Object.values(r.data);
      let playersList = [];
      //these 3 lines are turning the response object into JUST the author objects so that we can get the author ids
      reviewsAsList.splice(0, 2);
      reviewsAsList.pop();
      reviewsAsList = reviewsAsList.pop();
      playersList = reviewsAsList.map((review) => review.author); // just the player objects
      playersList = playersList.map((player) => player.steamid); // just the ids
      return playersList;
      //r.data returns 20 reviews unless otherwise specified
      //passing the cursor as a parameter gives the next page of reviews
      //you can get up to 100 reviews in a single page by passing a value with the numreviews parameter

      //TODO refactor to get certain number of reviews. Also maybe type of/recency of review
    });
  return playersList;
};

returnFunc = (id) => {
  return pullUserListByGameID(id, 0);
};

module.exports = { returnFunc };
