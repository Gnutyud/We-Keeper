const express = require("express");
const passport = require("passport");
const router = express.Router();
const { createToken, createRefreshToken, verifyJwtToken } = require("../helper/jwt");
const authController = require("../controllers/authController");
const loginLimiter = require("../middleware/loginLimiter");
const User = require('../models/User');

router.route("/").post(loginLimiter, authController.login);

router.route("/refresh").get(authController.refresh);

router.route("/logout").post(authController.logout);

// login with google

router.get("/login/failed", (req, res) => {
  res.status(401).json({ message: "login failed" });
});

router.post("/login/success", async (req, res) => {
  const { token } = req.body;
  const accessTokenDecoded = await verifyJwtToken(token, process.env.JWT_SECRET_TOKEN);
  if (!accessTokenDecoded.UserInfo.username) throw new Error("No user found in token");
  const foundUser = await User.findOne({ username: accessTokenDecoded.UserInfo.username }).exec();
  const accessToken = await createToken(foundUser);
  const refreshToken = await createRefreshToken(foundUser);
  // Create secure cookie with refresh token
  res.cookie("jwtcookie", refreshToken, {
    httpOnly: true, //accessible only by web server
    secure: true, //https
    sameSite: "None", //cross-site cookie
    path: "/auth",
    maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
  });

  let userInfo = {
    username: foundUser.username,
    userId: foundUser._id,
    avatar: foundUser.avatar,
    status: foundUser.status,
    roles: foundUser.roles,
    joinDate: foundUser.createdAt,
    source: foundUser.source,
  };

  res.json({ accessToken, userInfo });
});

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login/failed" }),
  async (req, res) => {
    console.log("user", req.user);
    const accessToken = await createToken(req.user);
    res.redirect(`${process.env.CLIENT_URL}/login?token=${accessToken}`);
  }
);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

module.exports = router;
