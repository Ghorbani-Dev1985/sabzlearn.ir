const contactModel = require("../../models/contact");
var nodemailer = require("nodemailer");

exports.create = async (req, res) => {
  const { name, email, phone, body } = req.body;

  const newcontact = await contactModel.create({
    name,
    email,
    phone,
    body,
    answer: 0,
  });

  return res.status(201).json(newcontact);
};

exports.getAll = async (req, res) => {
  const allcontacts = await contactModel.find();
  res.json(allcontacts);
};

exports.asnwer = async (req, res) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sabzlearnir@gmail.com",
      // pass: "h z v g l t m f l s y v z p h q",
      pass: "r t f p n x v q j x x o p x a o",
    },
  });

  var mailOptions = {
    from: "sabzlearnir@gmail.com",
    to: req.body.email,
    subject: "پاسخ پیغام شما از سمت آکادمی سبزلرن",
    text: req.body.answer,
  };

  const contact = await contactModel.findOneAndUpdate(
    { email: req.body.email },
    {
      answer: 1,
    }
  );

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.json({ message: error });
    } else {
      res.json({ message: "Email sent succesfully :))" });
    }
  });
};

exports.remove = async (req, res) => {
  const deletedContact = await contactModel.findOneAndRemove({
    _id: req.params.id,
  });
  if (!deletedContact) {
    return res.status(404).json({ message: "Contact Not Found!" });
  }
  return res.json(deletedContact);
};
