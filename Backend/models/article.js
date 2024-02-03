const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: false,
    },
    shortName: {
      type: String,
      required: true,
    },
    categoryID: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    publish: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const model = mongoose.model("Article", schema);

module.exports = model;
