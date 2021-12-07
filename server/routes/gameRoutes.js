const express = require("express"),
  router = express.Router(),
  {getSimilarGames} = require("../controllers/gameControllers");

router.get("/:appID", getSimilarGames); //return the bubble graph information for the provided game by id

module.exports = router;