const User = require('../models/User');
const { matchPassword } = require('../helper/password');
const { createToken, createRefreshToken, sendRefreshToken, verifyJwtToken } = require('../helper/jwt');
const asyncHandler = require('express-async-handler');

// @desc Login
// @route POST /auth
// @access Public
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username) throw new Error('Username is required!');
  if (!password) throw new Error('Password is required!');

  const foundUser = await User.findOne({ username }).exec();

  if (!foundUser || !foundUser.active) {
    res.status(401).json({ message: 'Incorrect username. Please try again.' })
  }

  const matchPwd = await matchPassword(foundUser.password, password);

  if (!matchPwd) {
    res.status(401).json({ message: 'Incorrect password. Please try again!' });
  }

  const accessToken = await createToken(foundUser);
  const refreshToken = await createRefreshToken(foundUser);
  sendRefreshToken(res, refreshToken);

  res.json({ accessToken });
});

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = async (req, res) => {
  const cookies = req.cookies;
  let cookieName = process.env.REFRESH_TOKEN_COOKIE_NAME;

  if (!cookies?.cookieName) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const refreshToken = cookies.cookieName;

  const refreshTokenDecoded = await verifyJwtToken(refreshToken, process.env.JWT_SECRET_REFRESH_TOKEN);

  if (!refreshTokenDecoded) {
    return res.status(401).json({ message: 'Unauthorized' })
  };

  const foundUser = User.findOne({ username: refreshTokenDecoded.username }).exec();

  if (!foundUser) return res.status(401).json({ message: 'Unauthorized' });

  const newAccessToken = createToken(foundUser);

  res.json({ newAccessToken });
};

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
  const cookies = req.cookies;
  let cookieName = process.env.REFRESH_TOKEN_COOKIE_NAME;

  if (!cookies?.cookieName) return res.sendStatus(204) //No content
  res.clearCookie(cookieName, { httpOnly: true, sameSite: 'None', secure: true })
  res.json({ message: 'Cookie cleared' });
};

module.exports = {
  login,
  refresh,
  logout
}
