const courseModel = require("../../models/course");
const sessionModel = require("../../models/session");
const commentModel = require("../../models/comment");
const categoryModel = require("../../models/category");
const courseUserModel = require("../../models/course-user");

exports.create = async (req, res) => {
  const {
    name,
    description,
    shortName,
    categoryID,
    price,
    support,
    status,
    discount,
  } = req.body;

  const course = await courseModel.create({
    name,
    description,
    shortName,
    creator: req.user._id,
    categoryID,
    price,
    isComplete: 0,
    status,
    support,
    cover: req.file.filename,
    discount: Boolean(discount) === true ? discount : 0,
  });

  const populatedCourse = await courseModel
    .findById(course._id)
    .populate("creator", "-password");

  return res.status(201).json(populatedCourse);
};

exports.getAll = async (req, res) => {
  const courses = await courseModel
    .find()
    .populate("creator", "-password")
    .populate("categoryID")
    .lean()
    .sort({ _id: -1 });

  const registers = await courseUserModel.find({}).lean();
  const comments = await commentModel.find().lean();

  let allCourses = [];
  courses.forEach((course) => {
    let courseTotalScore = 5;
    let courseRegisters = registers.filter(
      (register) => register.course.toString() === course._id.toString()
    );

    let courseScores = comments.filter(
      (comment) => comment.course.toString() === course._id.toString()
    );

    courseScores.forEach((comment) => {
      courseTotalScore += Number(comment.score);
    });

    allCourses.push({
      ...course,
      categoryID: course.categoryID.title,
      creator: course.creator.name,
      registers: courseRegisters.length,
      courseAverageScore: Math.floor(
        courseTotalScore / (courseScores.length + 1)
      ),
    });
  });

  return res.json(allCourses);
};

exports.getOne = async (req, res) => {
  const course = await courseModel
    .findOne({ shortName: req.params.shortName })
    .populate("categoryID", "-password")
    .populate("creator", "-password")
    .lean();

  const sessions = await sessionModel.find({ course: course._id }).lean();
  const comments = await commentModel
    .find({ course: course._id, answer: 1 })
    .populate("creator")
    .lean();

  const courseStudentsCount = await courseUserModel
    .find({
      course: course._id,
    })
    .count();

  let isUserRegisteredToThisCourse = null;
  if (req.user) {
    isUserRegisteredToThisCourse = !!(await courseUserModel.findOne({
      user: req.user._id,
      course: course._id,
    }));
  } else {
    isUserRegisteredToThisCourse = false;
  }

  let allComments = [];

  comments.forEach((comment) => {
    let mainCommentAnswerInfo = null;
    comments.forEach((answerComment) => {
      if (String(comment._id) == String(answerComment.mainCommendID)) {
        mainCommentAnswerInfo = { ...answerComment };
      }
    });
    if (!comment.mainCommendID) {
      allComments.push({
        ...comment,
        course: comment.course.name,
        answerContent: mainCommentAnswerInfo,
      });
    }
  });

  return res.json({
    ...course,
    courseStudentsCount,
    sessions,
    comments: allComments,
    isUserRegisteredToThisCourse,
  });
};

exports.createSession = async (req, res) => {
  const { title, time, free } = req.body;

  const session = await sessionModel.create({
    title,
    time,
    free,
    course: req.params.id,
    video: req.file.filename,
  });

  return res.status(201).json(session);
};

exports.getAllSessions = async (req, res) => {
  const allSessions = await sessionModel
    .find()
    .populate("course", "name")
    .lean();
  res.json(allSessions);
};

exports.register = async (req, res) => {
  const isUserAlreadyRegistered = await courseUserModel
    .findOne({ user: req.user._id, course: req.params.id })
    .lean();

  if (isUserAlreadyRegistered) {
    return res
      .status(409)
      .json({ message: "you are already registered to this course." });
  }

  await courseUserModel.create({
    user: req.user._id,
    course: req.params.id,
    price: req.body.price,
  });

  return res.status(201).json({ message: "you are registered successfully." });
};

exports.getCategoryCourses = async (req, res) => {
  const { categoryName } = req.params;
  const category = await categoryModel.find({ name: categoryName });
  if (category.length) {
    const categoryCourses = await courseModel.find({
      categoryID: category[0]._id,
    });
    res.json(categoryCourses);
  } else {
    res.json([]);
  }
};

exports.remove = async (req, res) => {
  const deletedCourse = await courseModel.findOneAndRemove({
    _id: req.params.id,
  });
  if (!deletedCourse) {
    return res.status(404).json({ message: "Course Not Found!" });
  }
  return res.json(deletedCourse);
};

exports.removeSession = async (req, res) => {
  const deletedSession = await sessionModel.findOneAndRemove({
    _id: req.params.id,
  });
  if (!deletedSession) {
    return res.status(404).json({ message: "Session Not Found!" });
  }
  return res.json(deletedSession);
};

exports.getSessionInfo = async (req, res) => {
  const course = await courseModel
    .findOne({ shortName: req.params.shortName })
    .lean();

  const session = await sessionModel.findOne({
    course: course._id,
    _id: req.params.sessionID,
  });

  const sessions = await sessionModel.find({ course: course._id });

  res.json({ sessions, session });
};

exports.getRelated = async (req, res) => {
  const { shortName } = req.params;
  const course = await courseModel.findOne({ shortName });
  let relatedCourses = await courseModel.find({
    categoryID: course.categoryID,
  });

  relatedCourses = relatedCourses.filter(
    (course) => course.shortName !== shortName
  );

  res.json(relatedCourses.splice(0, 4));
};
