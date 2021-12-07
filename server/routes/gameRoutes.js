const express = require("express"),
  router = express.Router(),
  {
    getSimilarGames,
    getAllSteamGames,
  } = require("../controllers/gameControllers");

router.get("/all", getAllSteamGames);
router.get("/:appID", getSimilarGames); //return the bubble graph information for the provided game by id
module.exports = router;
