const { verifyJwtToken } = require('../helper/jwt');

module.exports.authByToken = async (req, res, next) => {

  //Check for Authorization header (authHeader here is: "Bearer accessToken" or "null")
  const authHeader = req.header('Authorization') ? req.header('Authorization').split(' ') : null
  if (!authHeader) {
    return res.status(422).json({
      errors: { body: ['Authorization failed', 'No Authorization header'] }
    })
  }

  //Check if authorization type is token
  if (authHeader[0] !== 'Bearer')
    return res.status(401).json({
      errors: { body: ['Authorization failed', 'Token missing'] }
    })

  //Check if token is valid
  const token = authHeader[1];
  try {
    const accessTokenDecoded = await verifyJwtToken(token, process.env.JWT_SECRET_TOKEN);
    if (!accessTokenDecoded.UserInfo.username) throw new Error('No user found in token');
    req.user = accessTokenDecoded.UserInfo.username;
    req.roles = accessTokenDecoded.UserInfo.roles;
    return next()
  } catch (e) {
    return res.status(403).json({
      errors: { body: ['Forbidden', e.message] }
    })
  }

}