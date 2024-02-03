const coursesModel = require("./../../models/course");
const articlesModel = require("./../../models/article");

exports.get = async (req, res) => {
  const { value } = req.params;
  const allResultCourses = await coursesModel.find({
    name: { $regex: ".*" + value + ".*" },
  });
  const allResultArticles = await articlesModel.find({
    title: { $regex: ".*" + value + ".*" },
  });

  res.json({ allResultCourses, allResultArticles });
};
