const newsletterModel = require("../../models/newsletter");

exports.create = async (req, res) => {
  const { email } = req.body;

  const newEmail = await newsletterModel.create({ email });

  return res.status(201).json(newEmail);
};


exports.getAll = async (req, res) => {
  const allEmails = await newsletterModel.find()
  res.json(allEmails)
}