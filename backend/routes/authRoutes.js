const express = require("express");
const passport = require("passport");
const router = express.Router();
const authController = require("../controllers/authController");
const loginLimiter = require("../middleware/loginLimiter");
const { setUserInfoResponseCookie } = require("../middleware/auth");

router.route("/").post(loginLimiter, authController.login);

router.route("/refresh").get(authController.refresh);

router.route("/logout").post(authController.logout);

// login with google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/login/failed", (req, res) => {
  res.status(401).json({ message: "login failed" });
});

router.get("/google/callback", passport.authenticate("google"), setUserInfoResponseCookie, (req, res, next) => {
  // if success
  if (req.user) {
    res.redirect(process.env.CLIENT_URL);
  } else {
    res.redirect("/login/failed");
  }
  next();
});

module.exports = router;
