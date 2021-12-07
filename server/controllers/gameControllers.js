const gameModel = require("../models/gameModel");

exports.getSimilarGames = async (req, res, next) => {
  let appID = req.params.appID;
  if (req.params.appID == undefined) {
    const err = new Error(
      "Can't complete request. Missing one or more required parameters."
    );
    err.status = 400;
    next(err);
  }
  res.json(await gameModel.returnFunc(appID));
  // res.json(gameModel.returnFunc(appID));
};
