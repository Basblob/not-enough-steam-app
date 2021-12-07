const { default: axios } = require("axios"),
  path = require("path"),
  key = "120E1D21EE907F60B406ED55618E2577",
  steam_private = "https://api.steampowered.com",
  steam_public = "https://store.steampowered.com",
  steam_spy = "https://steamspy.com/api.php";

class relatedGame {
  constructor(gameID, gameName) {
    this.id = gameID;
    this.name = gameName;
    this.occurences = 1;
    this.radius = 1;
  }

  incrementOccurences() {
    this.occurences++;
    this.radius++;
  }
}

pullUserListByGameID = async (appID, numUsers) => {
  const playersList = axios
    .get(`${steam_public}/appreviews/${appID}?json=1&num_per_page=100`)
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
      //you can get up to 100 reviews in a single page by passing a value with the num_per_page parameter

      //TODO refactor to get certain number of reviews. Also maybe type of/recency of review
    });
  return playersList;
};

saveMostCommonGamesPlayed = async (userList) => {
  // TODO: Something to think about is saving more data than necessary in the nodes of a game.
  // This way, you can do interesting things with the data on the client side.
  // As an example, when you click on a game, maybe you could get a popup that should the average played hours.
  let tempGamesData = userList.map((id) => {
    let oneUsersGames = axios
      .get(
        `${steam_private}/IPlayerService/GetOwnedGames/v1/?key=${key}&steamid=${id}&include_appinfo=true`
      )
      .then((r) => {
        if (Object.keys(r.data.response).length !== 0) {
          let usersGames = [];
          r.data.response.games.map((game) => {
            if (game.playtime_forever > 20) {
              usersGames.push(new relatedGame(game.appid, game.name));
            }
          });
          return usersGames;
        }
      });
    return oneUsersGames;
  });
  let commonGames = await tempGamesData.shift();
  for (list in tempGamesData) {
    if (await tempGamesData[list] != undefined) {
      console.log(await tempGamesData[list]);
    }
  }

  // if (tempGamesPlayed.find((counted) => counted.id === game.id)) {
  //   tempGamesPlayed
  //     .find((counted) => counted.id === game.id)
  //     .incrementOccurences();
  // } else {
  //   tempGamesPlayed.push(new relatedGame(game.appid, game.name));
  // }
  return userList;
};

//The function which returns the graph.
//This function must retain information like the name and ID of the game that will be the parent node in the graph.
exports.returnFunc = async (id) => {
  return saveMostCommonGamesPlayed(await pullUserListByGameID(id, 0));
};

// module.exports = { returnFunc };
