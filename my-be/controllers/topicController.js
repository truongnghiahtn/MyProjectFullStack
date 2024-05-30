const handleFactory = require("./handleFactory");
const catchAsync = require("../utils/catchAsync");
const utils = require("../utils/util");
const AppError = require("../utils/appError");
const Topic = require("../models/topicModel");

class TopicController {

  getAllTopic = handleFactory.getAll(Topic);

  getTopic = handleFactory.getOne(Topic);

  createTopic = handleFactory.createOne(Topic);

  setTopicUpdate = catchAsync(async (req, res, next) => {
    req.body.updatedAt = Date.now();
    req.body = utils.filterObj(
      req.body,
      "name",
      "description",
      "file",
      "updatedAt",
    );
    next();
  });
  updateTopic = handleFactory.updateOne(Topic);

  deleteTopic = handleFactory.deleteOne(Topic);
}
module.exports = new TopicController();
