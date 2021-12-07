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
    this.group = "child";
  }

  incrementOccurences() {
    this.occurences++;
    this.radius++;
  }
}

getPlayerListPage = (appID, cursor, playersList) => {
  const playersListPlusCursor = axios
    .get(
      `${steam_public}/appreviews/${appID}?json=1&num_per_page=100&cursor=${cursor}`
    )
    .then((r) => {
      let reviewsAsList = Object.values(r.data);
      reviewsAsList.splice(0, 2);
      let nextCursor = reviewsAsList.pop();
      reviewsAsList = reviewsAsList.pop();
      newPlayersList = reviewsAsList.map((review) => review.author); // just the player objects
      newPlayersList = newPlayersList.map((player) => player.steamid); // just the ids
      // console.log(newPlayersList)
      playersList = playersList.concat(newPlayersList);
      return { nextCursor, playersList };
    })
    .catch((e) => {
      console.log(e);
    });
  return playersListPlusCursor;
};

pullUserListByGameID = async (appID) => {
  let pageOne = await getPlayerListPage(appID, "*", []);
  let pageTwo = await getPlayerListPage(
    appID,
    pageOne.nextCursor,
    pageOne.playersList
  );
  let pageThree = await getPlayerListPage(
    appID,
    pageTwo.nextCursor,
    pageTwo.playersList
  );
  let pageFour = await getPlayerListPage(
    appID,
    pageThree.nextCursor,
    pageThree.playersList
  );
  let pageFive = await getPlayerListPage(
    appID,
    pageFour.nextCursor,
    pageFour.playersList
  );
  return pageFive.playersList;
};

saveCommonGamesPlayed = async (userList) => {
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

  //
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
    if (game.group === "child") {
      return {
        source: game.id,
        target: parentID,
      };
    }
  });
  linksList.shift();
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
  let gameList = axios.get(`${steam_private}/ISteamApps/GetAppList/v2/?format=json`).then((r) => {
    return r.data.applist.apps
  });
  return gameList;
};
