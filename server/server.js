const express = require("express"),
  morgan = require("morgan"),
  axios = require("axios"),
  cors = require("cors"),
  PORT = 8080,
  gameRoutes = require("./routes/gameRoutes.js"),
  app = express();
  

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/game", gameRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
