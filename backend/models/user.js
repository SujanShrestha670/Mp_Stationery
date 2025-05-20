import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+977\s?\d{10}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      maxLength: [50, "Your name cannot exceed 50 characters"],
      validate: {
        validator: (v) => /^[A-Za-z\s]+$/.test(v),
        message: "Full Name must only contain letters and spaces",
      },
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      validate: {
        validator: (v) => emailRegex.test(v),
        message: "Enter a valid email address",
      },
    },
    phone: {
      type: String,
      required: [true, "Please enter your phone number"],
      unique: true,
      validate: {
        validator: (v) => phoneRegex.test(v),
        message: "Enter a valid Nepal phone number starting with +977",
      },
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      select: false,
      validate: {
        validator: (v) => passwordRegex.test(v),
        message:
          "Password must be at least 8 characters, include uppercase, lowercase, number, and special character",
      },
    },
    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      default: "user",
    },
    resetPasswordCode: String,
    resetPasswordExpire: Date,
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationCode: String,
    verificationCodeExpire: Date,
  },
  { timestamps: true }
);

// Encrypting password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// Return JWT Token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate password reset code
userSchema.methods.getResetPasswordCode = function () {
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  this.resetPasswordCode = resetCode;
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 30 minutes
  return resetCode;
};

export default mongoose.model("User", userSchema);
