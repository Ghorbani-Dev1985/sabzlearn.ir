const commentModel = require("../../models/comment");
const userModel = require("../../models/user");
const courseModel = require("../../models/course");

exports.create = async (req, res) => {
  const { body, courseShortName, score } = req.body;

  const course = await courseModel.findOne({ shortName: courseShortName });

  const comment = await commentModel.create({
    body,
    course: course._id,
    creator: req.user._id,
    answer: 0,
    isAnswer: 0,
    score
  });

  return res.status(201).json(comment);
};

exports.getAll = async (req, res) => {
  const allComments = await commentModel
    .find()
    .populate("creator", "-password")
    .populate("course")
    .lean();

  let comments = [];

  allComments.forEach((comment) => {
    let mainCommentAnswerInfo = null;
    allComments.forEach((answerComment) => {
      if (String(comment._id) == String(answerComment.mainCommendID)) {
        mainCommentAnswerInfo = { ...answerComment };
      }
    });
    if (!comment.mainCommendID) {
      comments.push({
        ...comment,
      //  course: comment.course.name,
        answerContent: mainCommentAnswerInfo,
      });
    }
  });

  return res.json(comments);
};

exports.remove = async (req, res) => {
  const deletedComment = await commentModel.findOneAndRemove({
    _id: req.params.id,
  });
  if (!deletedComment) {
    return res.status(404).json({ message: "Comment Not Found!" });
  }
  return res.json(deletedComment);
};

exports.answer = async (req, res) => {
  const { body } = req.body;

  const updateMainComment = await commentModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      answer: 1,
    }
  );

  const mainComment = await commentModel.findOne({ _id: req.params.id });

  const answerToComment = await commentModel.create({
    body,
    course: mainComment.course,
    creator: req.user._id,
    answer: 1,
    isAnswer: 1,
    mainCommendID: req.params.id,
    score: 5,
  });

  res.json(answerToComment);
};

exports.accept = async (req, res) => {
  const acceptedComment = await commentModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      answer: 1,
    }
  );

  res.json(acceptedComment);
};

exports.reject = async (req, res) => {
  const acceptedComment = await commentModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      answer: 0,
    }
  );

  res.json(acceptedComment);
};
