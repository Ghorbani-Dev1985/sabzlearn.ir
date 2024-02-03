const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    departmentID: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Department",
    },
    departmentSubID: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "DepartmentSub",
    },
    priority: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    answer: {
      type: Number,
      required: true,
    },
    parent: {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: 'Ticket'
    },
    course: {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: 'Course',
      default: '634e6b0e1d5142b91afa9bb3'
    },
    isAnswer: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

const model = mongoose.model("Ticket", schema);

module.exports = model;
