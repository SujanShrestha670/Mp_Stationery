/**
 * Create token and save in the cookie
 * @param {Object} user - The user object
 * @param {Number} statusCode - The status code for the response
 * @param {Object} res - The response object
 */
export default (user, statusCode, res) => {
  // Create JWT Token
  const token = user.getJwtToken();

  // Options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};
