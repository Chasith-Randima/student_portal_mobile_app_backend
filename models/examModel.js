const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const examSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "User must have a title...Please add a title..."],
    },
    badge: {
      type: String,
    },
    degree: {
      type: String,
    },
    examDate: {
      type: Date,
    },

    module: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Module",
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Exam = mongoose.model("Exam", examSchema);
module.exports = Exam;
