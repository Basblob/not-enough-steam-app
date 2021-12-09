const gameModel = require("../models/gameModel");

exports.getAllSteamGames = async (req, res, next) => {
  res.json(gameModel.returnAllGames());
};

exports.getSimilarGames = async (req, res, next) => {
  let appID = req.params.appID;
  if (req.params.appID == undefined) {
    const err = new Error(
      "Can't complete request. Missing one or more required parameters."
    );
    err.status = 400;
    next(err);
  }
  res.json(await gameModel.returnForceGraph(appID));
};

exports.getGameInfo = async (req, res, next) => {
  let appID = req.params.appID;
  let gameInfo = await gameModel.getAppInfo(appID)
  res.json(gameInfo)
}