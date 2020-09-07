const mongoose = require("mongoose");
const validator = require("validator");
const { BadRequest, GeneralError } = require("../utils/errors");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new BadRequest("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new BadRequest('Password cannot contain "password"');
        }
      },
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new BadRequest("Age must be a postive number");
        }
      },
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});

userSchema.statics.findDuplicateEmails = async function (email) {
  try {
    let user = await this.findOne({ email }).lean();
    if (user) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new GeneralError(error);
  }
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  userObject.id = userObject._id;

  delete userObject._id;
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.__v;

  return userObject;
};

module.exports = mongoose.model("User", userSchema);
