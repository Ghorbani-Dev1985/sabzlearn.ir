const departmentModel = require("../../models/department");
const departmentSubModel = require("../../models/department-sub");
const ticketModel = require("../../models/ticket");
const courseModel = require("../../models/course");

exports.create = async (req, res) => {
  const { departmentID, departmentSubID, title, priority, body, course } =
    req.body;

  const ticket = await ticketModel.create({
    departmentID,
    departmentSubID,
    title,
    body,
    priority,
    user: req.user._id,
    answer: 0,
    isAnswer: 0,
    course,
  });

  const mainTicket = await ticketModel
    .findOne({ _id: ticket._id })
    .populate("departmentID")
    .populate("departmentSubID")
    .populate("user");

  return res.status(201).json(mainTicket);
};

exports.userTickets = async (req, res) => {
  const tickets = await ticketModel
    .find({ user: req.user._id })
    .sort({ _id: -1 })
    .populate("departmentID")
    .populate("departmentSubID")
    .populate("user")
    .lean();

  let ticketsArray = [];

  tickets.forEach((ticket) => {
    if (ticket.isAnswer === 0) {
      ticketsArray.push({
        ...ticket,
        departmentID: ticket.departmentID.title,
        departmentSubID: ticket.departmentSubID.title,
        user: ticket.user.name,
      });
    }
  });

  return res.json(ticketsArray);
};

exports.getAll = async (req, res) => {
  const tickets = await ticketModel
    .find({ isAnswer: 0 })
    .populate("user")
    .populate("course")
    .populate("departmentID")
    .populate("departmentSubID")
    .lean();

  let ticketsArray = [];

  tickets.forEach(async (ticket) => {

    if (ticket.isAnswer === 0) {
      ticketsArray.push({
        ...ticket,
        departmentID: ticket.departmentID.title,
        departmentSubID: ticket.departmentSubID.title,
        user: ticket.user.name,
        course: ticket.course ? ticket.course.name : null
      });
    }
  });

  console.log(ticketsArray);

  return res.json(ticketsArray);
};

exports.getAnswer = async (req, res) => {
  const { id } = req.params;
  const answerTicker = await ticketModel.findOne({ parent: id });
  const ticket = await ticketModel.findOne({ _id: id });

  res.json({
    ticket: ticket.body,
    answer: answerTicker ? answerTicker.body : null,
  });
};

exports.setAnswer = async (req, res) => {
  const { body, ticketID } = req.body;

  const ticket = await ticketModel.findOne({ _id: ticketID }).lean();

  const answer = await ticketModel.create({
    title: ticket.title,
    body,
    parent: ticketID,
    priority: ticket.priority,
    user: req.user._id,
    isAnswer: 1,
    answer: 0,
    departmentID: ticket.departmentID,
    departmentSubID: ticket.departmentSubID,
  });

  const updatedTicket = await ticketModel.findOneAndUpdate(
    { _id: ticket._id },
    {
      answer: 1,
    }
  );

  return res.json(answer);
};

exports.departments = async (req, res) => {
  const departments = await departmentModel.find();

  res.json(departments);
};

exports.departmentsSubs = async (req, res) => {
  const departmentSubs = await departmentSubModel
    .find({ parent: req.params.id })
    .lean();
  res.json(departmentSubs);
};
