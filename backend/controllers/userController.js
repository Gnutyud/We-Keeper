const User = require("../models/User");
const Note = require("../models/Note");
const Token = require("../models/Token");
const asyncHandler = require("express-async-handler");
const { hashPassword, matchPassword } = require("../helper/password");
const crypto = require("crypto");
const sendEmail = require("../helper/sendEmail");

// @desc Get all users
// @route Get /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();
  if (!users?.length) {
    return res.status(400).json({ message: "No users found!" });
  }

  // Add total notes to each user before sending the response
  const userWithNotes = await Promise.all(
    users.map(async (user) => {
      const notes = await Note.find({ userId: user._id }).lean().exec();
      return { ...user, totalNotes: notes?.length };
    })
  );

  return res.status(200).json(userWithNotes);
});

// @desc Update a user
// @route PATCH /users
// @access Private
const getUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  // confirm data
  if (!userId) return res.status(400).json({ message: "userId is required" });

  const user = await User.findById(userId).select("-password").exec();

  if (!user) {
    return res.status(400).json({ message: "User not found!" });
  }

  const notes = await Note.find({ userId });

  return res.status(200).json({ data: user, totalNotes: notes?.length });
});

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
  const { username, password, roles, email, status } = req.body;
  //  check input data
  if (!username || !password || !email) {
    return res.status(400).json({ message: "All Fields are required!" });
  }
  // check duplicate
  const duplicate = await User.findOne({ username }).lean().exec();
  if (duplicate) {
    return res.status(409).json({ message: "username already exist" });
  }
  const duplicateEmail = await User.findOne({ email }).lean().exec();
  if (duplicateEmail) {
    return res.status(409).json({ message: "email already exist" });
  }
  // hash password
  const hashPwd = await hashPassword(password);

  const userObject = { username, password: hashPwd, email };
  if (roles) userObject.roles = roles;
  if (status) userObject.status = status;
  // Create and store new user
  const user = await User.create(userObject);
  if (user) {
    res.status(200).json({ message: `New user ${username} created` });
  } else {
    res.status(400).json({ message: "Invalid user data received" });
  }
});

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  const { username, currentPassword, id, email, status, newPassword, avatar } = req.body;
  // confirm data
  if (!username || !id || !email) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found!" });
  }

  // check duplicate
  const duplicateUsername = await User.findOne({ username }).lean().exec();
  if (duplicateUsername && duplicateUsername?._id.toString() !== id) {
    return res.status(409).json({ message: "Username already exist", field: "username" });
  }

  const duplicateEmail = await User.findOne({ email }).lean().exec();
  if (duplicateEmail && duplicateEmail?._id.toString() !== id) {
    return res.status(409).json({ message: "Email already exist", field: "email" });
  }

  user.username = username;
  user.email = email;

  if (currentPassword) {
    const matchPwd = await matchPassword(user.password, currentPassword);
    if (!matchPwd) {
      return res.status(401).json({ message: "Incorrect password. Please try again!", field: "currentPassword" });
    }
    if (newPassword) {
      // Hash password
      user.password = await hashPassword(newPassword);
    }
  }

  if (status) user.status = status;
  if (avatar) user.avatar = avatar;

  await user.save();
  res.status(200).json({ message: "updated user" });
});

// @desc Update role of user
// @route PATCH /users/role
// @access Private
const updateUserRole = asyncHandler(async (req, res) => {
  const { id, role } = req.body;
  if (!id || !role) return res.status(400).json({ message: "All fields are required!" });

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found!" });
  }

  user.roles = role;
  await user.save();
  res.status(200).json({ message: "updated role successfully!" });
});

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "User ID is required!" });
  }

  // delete all notes created by this user
  await Note.remove({ userId: id });

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const result = await user.deleteOne();

  res.status(200).json({ message: `Username ${result.username} with ID ${result._id} deleted!` });
});

// @desc Request password reset
// @route POST /users/forgot-password
// @access Private
const requestPasswordForgot = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required!" });
  }
  const foundUser = await User.findOne({ email }).exec();
  if (!foundUser) {
    return res.status(400).json({ message: "No user with that email adddress was found." });
  }
  let resetToken = await Token.findOne({ userId: foundUser._id });
  if (!resetToken) {
    resetToken = await new Token({
      userId: foundUser._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
  }

  await sendEmail(foundUser, resetToken.token);

  res.status(200).json({ message: "password reset link sent to your email account" });
});

// @desc Reset password
// @route POST /users/reset-password
// @access Private
const resetPassword = asyncHandler(async (req, res) => {
  const { password, token, userId } = req.body;
  if (!password && !token && !userId) {
    return res.status(400).json({ message: "All fields are required!" });
  }
  const foundUser = await User.findById(userId);
  if (!foundUser) return res.status(400).json({ message: "Invalid link" });
  const ResetToken = await Token.findOne({
    userId: foundUser._id,
    token: token,
  });
  if (!ResetToken) return res.status(400).json({ message: "Invalid link" });
  let tokenDate = new Date(ResetToken.createdAt);
  let currentDate = new Date();
  let diffTime = (currentDate - tokenDate) / 1000; // to seconds
  if (diffTime > 10 * 60) {
    await ResetToken.delete();
    return res.status(400).json({ message: "Your link is expired in 10 minutes" }); // expired in 10 minutes
  };

  foundUser.password = await hashPassword(password);
  await foundUser.save();
  await ResetToken.delete();

  res.status(200).json({ message: "password changed sucessfully!" });
});

module.exports = {
  getAllUsers,
  getUser,
  createNewUser,
  updateUser,
  deleteUser,
  updateUserRole,
  requestPasswordForgot,
  resetPassword,
};
