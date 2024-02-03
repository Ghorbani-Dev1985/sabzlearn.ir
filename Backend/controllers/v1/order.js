const courseUserModel = require("../../models/course-user");

exports.getAll = async (req, res) => {
  const allOrders = await courseUserModel.find({ user: req.user._id }).populate('course').lean();

  res.json(allOrders);
};

exports.getOne = async (req, res) => {
  const mainOrder = await courseUserModel.find({ _id: req.params.id }).populate('course').lean();

  res.json(mainOrder);
};
