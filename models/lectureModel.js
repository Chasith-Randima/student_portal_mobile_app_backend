const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const lectureSchema = new mongoose.Schema(
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
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
    date: {
      type: Date,
    },

    createdBy: [
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
    timestamps: true,
  }
);

lectureSchema.pre(/^find/, function (next) {
  this.populate({
    path: "createdBy",
    select: "_id username role",
  });

  next();
});

// lectureSchema.virtual("materials", {
//   ref: "Material",
//   foreignField: "module",
//   localField: "_id",
// });

const Lecture = mongoose.model("Lecture", lectureSchema);
module.exports = Lecture;
