const courseModel = require("../../models/course");
const sessionModel = require("../../models/session");
const commentModel = require("../../models/comment");
const courseUserModel = require("../../models/course-user");

exports.create = async (req, res) => {
  const { name, description, shortName, categoryID } = req.body;

  console.log(req.body);

  const course = await courseModel.create({
    name,
    description,
    shortName,
    creator: req.user._id,
    categoryID,
    isComplete: 0,
    cover: "images/courses/js.jpeg",
  });

  const populatedCourse = await courseModel
    .findById(course._id)
    .populate("creator", "-password");

  return res.status(201).json(populatedCourse);
};

exports.getAll = async (req, res) => {
  const courses = await courseModel.find().populate("creator", "-password");

  return res.json(courses);
};

exports.getOne = async (req, res) => {
  const course = await courseModel
    .findOne({ shortName: req.params.shortName })
    .populate("categoryID", "-password")
    .populate("creator", "-password")
    .lean();

  const sessions = await sessionModel.find({ course: course._id }).lean();
  const comments = await commentModel.find({ course: course._id }).lean();

  const courseStudentsCount = await courseUserModel
    .find({
      course: course._id,
    })
    .count();

  const isUserRegisteredToThisCourse = !!(await courseUserModel.findOne({
    user: req.user._id,
    course: course._id,
  }));

  return res.json({
    ...course,
    courseStudentsCount,
    sessions,
    comments,
    isUserRegisteredToThisCourse,
  });
};

exports.createSession = async (req, res) => {
  const { title } = req.body;

  const session = await sessionModel.create({
    title,
    course: req.params.id,
  });

  return res.status(201).json(session);
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
  });

  return res.status(201).json({ message: "you are registered successfully." });
};
