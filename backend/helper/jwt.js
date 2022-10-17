const jwt = require('jsonwebtoken');

const createToken = async (user) => {
  return new Promise((resolve, reject) => {
    jwt.sign({
      "UserInfo": {
        "username": user.username,
        "roles": user.roles
      }
    },
      process.env.JWT_SECRET_TOKEN,
      { expiresIn: "10s" }, (err, token) => {
        if (err) return reject(err);
        return resolve(token)
      })
  })
}

const createRefreshToken = async (user) => {
  return new Promise((resolve, reject) => {
    jwt.sign({
      "username": user.username
    },
      process.env.JWT_SECRET_REFRESH_TOKEN,
      { expiresIn: "1d" }, (err, token) => {
        if (err) return reject(err);
        return resolve(token)
      })
  })
}

const verifyJwtToken = (token, secretKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      return resolve(decoded);
    });
  });
};

const sendRefreshToken = (res, refreshToken) => {
  res.cookie(
    process.env.REFRESH_TOKEN_COOKIE_NAME,
    refreshToken,
    {
      httpOnly: true, // accessible only by web server
      secure: true, // https
      sameSite: 'None', // cross-site cookie
      path: '/refreshToken',
      maxAge: 7 * 24 * 60 * 60 * 1000 // cookie expiry
    }
  )
}

module.exports = { createToken, createRefreshToken, verifyJwtToken, sendRefreshToken }