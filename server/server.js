const express = require("express"),
  morgan = require("morgan"),
  // database = require("./knexfile"),
  // knex = require("knex")(database),
  axios = require("axios"),
  cors = require("cors"),
  PORT = 8080,
  key = "120E1D21EE907F60B406ED55618E2577",
  private_url = "https://api.steampowered.com",
  public_url = "https://store.steampowered.com",
  steam_spy = "https://steamspy.com/api.php",
  gameRoutes = require("./routes/gameRoutes.js"),
  app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/game", gameRoutes);

app.get("/mostplayed", async (req, res, next) => {
  const top100 = axios.get(`${steam_spy}?request=top100in2weeks`).then((r) => {
    let top100AsList = Object.values(r.data);
    let example = top100AsList[0];
    // for (game in r.data) {
    //   console.log(game);
    //   topList.push(r.data.game);
    // }
    // return topList;
    // console.log(top100AsList[0]);
    return top100AsList[0];
  });
  // console.log(await top100);
  // console.log(Object.values(await top100)[0]);
  let currAppID = (await top100).appid;
  // console.log(currAppID);
  let playerList = axios
    .get(
      `https://store.steampowered.com/appreviews/${(await top100).appid}?json=1`
    )
    .then((r) => {
      // console.log(r.data);
      let reviewsAsList = Object.values(r.data);
      let playersList = [];
      //these 3 lines are turning the response object into JUST the author objects so that we can get the author ids
      reviewsAsList.splice(0, 2);
      reviewsAsList.pop();
      reviewsAsList = reviewsAsList.pop();
      playersList = reviewsAsList.map((review) => review.author); // just the player objects
      playersList = playersList.map((player) => player.steamid); // just the ids

      // reviewsAsList.map((review) => console.log(review));
      // console.log(playersList);
      // res.json(playersList);
      return playersList;
      //r.data returns 20 reviews unless otherwise specified
      //passing the cursor as a parameter gives the next page of reviews
      //you can get up to 100 reviews in a single page by passing a value with the numreviews parameter
    })
    .catch((e) => {
      console.log(e);
    });
  playerList = await playerList;
  console.log(await playerList);
  // for(id in (await playerList)){
  //   console.log(playerList[id])
  // }
  // axios.get(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${key}&steamid=${}&format=json`)
  // res.json("hello");
});

app.get("/test", async (req, res, next) => {
  axios.get(`${steam_spy}`).then((r) => {
    res.json(r.data);
  });
  res.send("works");
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
