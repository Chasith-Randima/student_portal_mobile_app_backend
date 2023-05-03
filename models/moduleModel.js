const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const moduleSchema = new mongoose.Schema(
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
    faculty: {
      type: String,
    },

    material: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Material",
        // required: [true, "Appointment must belong to a hospital"],
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Module = mongoose.model("Module", moduleSchema);
module.exports = Module;
