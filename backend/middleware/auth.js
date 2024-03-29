const { verifyJwtToken, createRefreshToken } = require("../helper/jwt");

module.exports.authByToken = async (req, res, next) => {
  //Check for Authorization header (authHeader here is: "Bearer accessToken" or "null")
  const authHeader = req.header("Authorization") ? req.header("Authorization").split(" ") : null;
  if (!authHeader) {
    return res.status(422).json({
      errors: { body: ["Authorization failed", "No Authorization header"] },
    });
  }

  //Check if authorization type is token
  if (authHeader[0] !== "Bearer")
    return res.status(401).json({
      errors: { body: ["Authorization failed", "Token missing"] },
    });

  //Check if token is valid
  const token = authHeader[1];
  try {
    const accessTokenDecoded = await verifyJwtToken(token, process.env.JWT_SECRET_TOKEN);
    if (!accessTokenDecoded.UserInfo.username) throw new Error("No user found in token");
    req.user = accessTokenDecoded.UserInfo.username;
    req.roles = accessTokenDecoded.UserInfo.roles;
    return next();
  } catch (e) {
    return res.status(403).json({
      errors: { body: ["Forbidden", e.message] },
    });
  }
};

module.exports.authByAdminToken = async (req, res, next) => {
  //Check for Authorization header (authHeader here is: "Bearer accessToken" or "null")
  const authHeader = req.header("Authorization") ? req.header("Authorization").split(" ") : null;
  if (!authHeader) {
    return res.status(422).json({
      errors: { body: ["Authorization failed", "No Authorization header"] },
    });
  }

  //Check if authorization type is token
  if (authHeader[0] !== "Bearer")
    return res.status(401).json({
      errors: { body: ["Authorization failed", "Token missing"] },
    });

  //Check if token is valid
  const token = authHeader[1];
  try {
    const accessTokenDecoded = await verifyJwtToken(token, process.env.JWT_SECRET_TOKEN);
    if (!accessTokenDecoded.UserInfo.username) throw new Error("No user found in token");
    if (accessTokenDecoded.UserInfo.roles !== "admin") throw new Error("Permission denied");
    req.user = accessTokenDecoded.UserInfo.username;
    req.roles = accessTokenDecoded.UserInfo.roles;
    return next();
  } catch (e) {
    return res.status(403).json({
      errors: { body: ["Forbidden", e.message] },
    });
  }
};

module.exports.setUserInfoResponseCookie = async (req, res, next) => {
  if (req.user) {
    // if user successfully signed in, store user-id in cookie
    if (req.user) {
      const refreshToken = await createRefreshToken(req.user);
      // Create secure cookie with refresh token
      res.cookie(process.env.REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
        httpOnly: true, //accessible only by web server
        secure: true, //https
        sameSite: "None", //cross-site cookie
        path: "/auth",
        maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
      });
    } else {
      res.clearCookie(process.env.REFRESH_TOKEN_COOKIE_NAME);
    }
  }
  next();
};
