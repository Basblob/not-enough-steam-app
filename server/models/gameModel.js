require("dotenv").config();
const axios = require("axios"),
  key = process.env.STEAM_API_KEY,
  steam_private = "https://api.steampowered.com",
  steam_public = "https://store.steampowered.com",
  allGames = require("../data/AllGamesFromAPIFormatted.json");

class relatedGame {
  constructor(gameID, gameName) {
    this.id = gameID;
    this.name = gameName;
    this.occurences = 1;
    this.radius = 1;
    this.group = "child";
  }

  incrementOccurences() {
    this.occurences++;
    this.radius++;
  }
}

getPlayerListPage = (appID, cursor, playersList) => {
  console.log("Grabbing next page of results...");
  const playersListPlusCursor = axios
    .get(
      `${steam_public}/appreviews/${appID}?json=1&num_per_page=10&cursor=${cursor}`
    )
    .then((r) => {
      let reviewsAsList = Object.values(r.data);
      reviewsAsList.splice(0, 2);
      let nextCursor = reviewsAsList.pop();
      reviewsAsList = reviewsAsList.pop();
      newPlayersList = reviewsAsList.map((review) => review.author); // just the player objects
      newPlayersList = newPlayersList.map((player) => player.steamid); // just the ids
      playersList = playersList.concat(newPlayersList);
      return { nextCursor, playersList };
    })
    .catch((e) => {
      console.log(e);
    });
  return playersListPlusCursor;
};

pullUserListByGameID = async (appID) => {
  console.log("Generating player list for game...");
  let pageOne = await getPlayerListPage(appID, "*", []);
  console.log("1 done");
  return pageOne.playersList;
};

saveCommonGamesPlayed = async (userList) => {
  console.log("Finding most common Games...");
  let tempGamesData = userList.map((id) => {
    let oneUsersGames = axios
      .get(
        `${steam_private}/IPlayerService/GetOwnedGames/v1/?key=${key}&steamid=${id}&include_appinfo=true`
      )
      .then((r) => {
        if (Object.keys(r.data.response).length !== 0) {
          let usersGames = [];
          r.data.response.games.map((game) => {
            if (game.playtime_forever > 10) {
              usersGames.push(new relatedGame(game.appid, game.name));
            }
          });
          return usersGames;
        }
      })
      .catch((e) => {
        console.log(e);
      });
    return oneUsersGames;
  });

  // Find first usable data
  let commonGames = await tempGamesData.shift();
  while (commonGames == undefined) {
    commonGames = await tempGamesData.shift();
  }

  for (list in tempGamesData) {
    if ((await tempGamesData[list]) != undefined) {
      (await tempGamesData[list]).map((game) => {
        if (commonGames.find((commonGame) => commonGame.id === game.id)) {
          commonGames
            .find((commonGame) => commonGame.id === game.id)
            .incrementOccurences();
        } else {
          commonGames.push(game);
        }
      });
    }
  }
  return commonGames;
};

formatAsForceGraph = (commonGames, appID) => {
  console.log("Formatting Data into usable format...");
  commonGames.find((game) => game.id == appID).group = "parent";
  let parentGame = commonGames.find((game) => game.group === "parent");
  let sortedCommonGames = commonGames.sort(
    (a, b) => b.occurences - a.occurences
  );
  let mostPlayed = sortedCommonGames.splice(0, 9);
  if (!mostPlayed.find((game) => game.id == appID)) {
    mostPlayed.unshift(parentGame);
  }
  let parentID = mostPlayed.find((game) => game.group === "parent").id;
  let linksList = mostPlayed.map((game) => {
    console.log(parentID);
    if (game.group == "child") {
      return {
        source: game.id,
        target: parentID,
      };
    }
  });
  linksList.shift();
  let returnObj = { nodes: mostPlayed, links: linksList };
  returnObj.links.map((link) => {
    if (link == undefined) {
      returnObj.links.splice(returnObj.links.indexOf(link), 1);
      returnObj.links.unshift({ source: 730, target: parentID });
    }
  });
  console.log(returnObj);
  return { nodes: mostPlayed, links: linksList };
};

//The function which returns the graph.
exports.returnForceGraph = async (id) => {
  return formatAsForceGraph(
    await saveCommonGamesPlayed(await pullUserListByGameID(id)),
    id
  );
};

exports.returnAllGames = () => {
  let gameList = axios
    .get(`${steam_private}/ISteamApps/GetAppList/v2/?format=json`)
    .then((r) => {
      return r.data.applist.apps;
    });
  return allGames;
};

exports.getAppInfo = (id) => {
  let gameInfo = axios
    .get(`${steam_public}/api/appdetails?language=english&appids=${id}`)
    .then((r) => {
      return r.data;
    });
  return gameInfo;
};
