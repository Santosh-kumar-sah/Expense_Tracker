const jwt = require('jsonwebtoken');

const getCookieOptions = (req = null) => {
  const isProduction =
    process.env.NODE_ENV === 'production' ||
    Boolean(process.env.CLIENT_URL && process.env.CLIENT_URL.startsWith('https://')) ||
    Boolean(req && (req.secure || req.headers['x-forwarded-proto'] === 'https'));

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
  };
};

const generateToken = (res, userId, req = null) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  res.cookie('token', token, getCookieOptions(req));
  return token;
};

module.exports = { generateToken, getCookieOptions };