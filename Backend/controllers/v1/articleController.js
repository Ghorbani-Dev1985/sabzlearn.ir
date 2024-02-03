const articleModel = require("../../models/article");
const sessionModel = require("../../models/session");

exports.create = async (req, res) => {
  const { title, description, body, shortName, categoryID } = req.body;

  const article = await articleModel.create({
    title,
    description,
    shortName,
    body,
    creator: req.user._id,
    categoryID,
    cover: req.file.filename,
    publish: 1
  });

  const populatedCourse = await articleModel
    .findById(article._id)
    .populate("creator", "-password");

  return res.status(201).json(populatedCourse);
};

exports.saveDraft = async (req, res) => {
  const { title, description, body, shortName, categoryID } = req.body;

  const article = await articleModel.create({
    title,
    description,
    shortName,
    body,
    creator: req.user._id,
    categoryID,
    cover: req.file.filename,
    publish: 0
  });

  const populatedCourse = await articleModel
    .findById(article._id)
    .populate("creator", "-password");

  return res.status(201).json(populatedCourse);
};

exports.getAll = async (req, res) => {
  const articles = await articleModel.find().populate("creator", "-password").sort({ _id: -1 });
  return res.json(articles);
};

exports.getOne = async (req, res) => {
  const article = await articleModel
    .findOne({ shortName: req.params.shortName })
    .populate("categoryID")
    .populate("creator", "-password")
    .lean();

  res.json(article);
};

exports.remove = async (req, res) => {
  const deletedArticle = await articleModel.findOneAndRemove({
    _id: req.params.id,
  });
  if (!deletedArticle) {
    return res.status(404).json({ message: "Article Not Found!" });
  }
  return res.json(deletedArticle);
};
