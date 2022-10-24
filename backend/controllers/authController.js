const User = require('../models/User');
const { matchPassword } = require('../helper/password');
const { createToken, createRefreshToken, verifyJwtToken } = require('../helper/jwt');
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
    return res.status(401).json({ message: 'Incorrect username. Please try again.' })
  }

  const matchPwd = await matchPassword(foundUser.password, password);

  if (!matchPwd) {
    return res.status(401).json({ message: 'Incorrect password. Please try again!' });
  }

  const accessToken = await createToken(foundUser);
  const refreshToken = await createRefreshToken(foundUser);
  // Create secure cookie with refresh token 
  res.cookie('jwtcookie', refreshToken, {
    httpOnly: true, //accessible only by web server 
    secure: true, //https
    sameSite: 'None', //cross-site cookie 
    path: '/auth/refresh',
    maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
  })

  res.json({ accessToken });
});

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = async (req, res) => {
  const cookies = req.cookies;
  let cookieName = process.env.REFRESH_TOKEN_COOKIE_NAME;

  if (cookies && !cookies[cookieName]) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const refreshToken = cookies[cookieName];

  const refreshTokenDecoded = await verifyJwtToken(refreshToken, process.env.JWT_SECRET_REFRESH_TOKEN);

  if (!refreshTokenDecoded) {
    return res.status(401).json({ message: 'Unauthorized' })
  };

  const foundUser = await User.findOne({ username: refreshTokenDecoded.UserInfo.username }).exec();

  if (!foundUser) return res.status(401).json({ message: 'Unauthorized' });

  const accessToken = await createToken(foundUser);

  res.json({ accessToken });
};

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
  const cookies = req.cookies;
  let cookieName = process.env.REFRESH_TOKEN_COOKIE_NAME;

  if (cookies && !cookies[cookieName]) return res.sendStatus(204) //No content
  res.clearCookie(cookieName, { httpOnly: true, sameSite: 'None', secure: true })
  res.json({ message: 'Cookie cleared' });
};

module.exports = {
  login,
  refresh,
  logout
}
