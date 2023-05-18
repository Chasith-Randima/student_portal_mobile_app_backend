const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "User must have a name...Please tell us your name..."],
    },
    badge: {
      type: String,
    },
    images: [String],
    degree: {
      type: String,
    },
    faculty: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "User must have a email...Please tell us your email..."],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please enter a valid email..."],
    },
    role: {
      type: String,
      enum: ["student", "lecturer", "admin"],
      default: "student",
    },
    password: {
      type: String,
      required: [true, "Please choose a password..."],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password...."],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords are not the same..",
      },
    },
    passwordChangedAt: {
      type: Date,
    },
    module: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Module",
        // required: [true, "Appointment must belong to a hospital"],
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 2000;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000.1
    );
    return JWTTimeStamp < changedTimestamp;
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
