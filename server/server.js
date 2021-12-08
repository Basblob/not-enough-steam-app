const express = require("express"),
  morgan = require("morgan"),
  axios = require("axios"),
  cors = require("cors"),
  PORT = 8080,
  key = "120E1D21EE907F60B406ED55618E2577",
  private_url = "https://api.steampowered.com",
  public_url = "https://store.steampowered.com",
  steam_spy = "https://steamspy.com/api.php",
  gameRoutes = require("./routes/gameRoutes.js"),
  app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/game", gameRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
