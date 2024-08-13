import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters long"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: ["M", "F"],
    },
    uucms: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          // Check uniqueness only if role is 'student'
          if (this.role === "student") {
            return mongoose.models.User.countDocuments({ uucms: v }).then(count => count === 0);
          }
          return true; // Skip uniqueness check for non-students
        },
        message: "UUCMS must be unique for students",
      },
      required: function () {
        return this.role === "student";
      }, // Required only if the role is 'student'
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      default: "student",
      enum: ["student", "admin", "teacher"],
    },
    verified: {
      type: Boolean,
      default: false,
    },
    caste: {
      type: String,
      enum: ["general", "obc", "sc", "st"], // You can add more categories if needed
      required: function () {
        return this.role === "student";
      }, // Required only if the role is 'student'
    },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
