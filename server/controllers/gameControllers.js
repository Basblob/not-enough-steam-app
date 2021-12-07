const gameModel = require("../models/gameModel");

exports.getSimilarGames = async (req, res, next) => {
  let appID = req.params.appID;
  
  res.json(await gameModel.returnFunc(appID))
  // res.json(gameModel.returnFunc(appID));

};
