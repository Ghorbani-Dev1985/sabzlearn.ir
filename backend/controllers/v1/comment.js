const commentModel = require("../../models/comment");
const userModel = require("../../models/user");
const courseModel = require("../../models/course");

exports.create = async (req, res) => {
  const { body, courseShortName } = req.body;

  console.log(body, courseShortName, req.user._id);
  const course = await courseModel.findOne({ shortName: courseShortName });

  console.log(course);

  const comment = await commentModel.create({
    body,
    course: course._id,
    creator: req.user._id,
  });

    return res.status(201).json(comment);
};

// exports.getAll = async (req, res) => {
//   const courses = await courseModel.find().populate("creator", "-password");

//   return res.json(courses);
// };