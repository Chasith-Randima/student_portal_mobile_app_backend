const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const resultSchema = new mongoose.Schema(
  {
    marks: {
      type: String,
      required: [true, "User must have marks...Please add a mark..."],
    },
    exam: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Exam",
        // required: [true, "Appointment must belong to a hospital"],
      },
    ],
    lecturer: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        // required: [true, "Appointment must belong to a hospital"],
      },
    ],
    student: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        // required: [true, "Appointment must belong to a hospital"],
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Result = mongoose.model("Result", resultSchema);
module.exports = Result;
