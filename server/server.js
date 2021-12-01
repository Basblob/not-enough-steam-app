const express = require("express"),
  morgan = require("morgan"),
  // database = require("./knexfile"),
  // knex = require("knex")(database),
  axios = require("axios"),
  cors = require("cors"),
  PORT = 8080,
  key = "9AC94E4A61E63CCF470E57C5A0688534",
  private_url = "https://api.steampowered.com",
  public_url = "https://store.steampowered.com",
  steam_spy = "https://steamspy.com/api.php",
  app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/mostplayed", async (req, res, next) => {
  const top100 = axios.get(`${steam_spy}?request=top100in2weeks`).then((r) => {
    let top100AsList = Object.values(r.data);
    
    // for (game in r.data) {
    //   console.log(game);
    //   topList.push(r.data.game);
    // }
    // return topList;
  });

  // const exampleGame = await top100[top100.indexOf("1085660")];
  res.json(await top100);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
