const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

const AuthService = {
  getUserWithUserName(db, user_name) {
    return db('thingful_users')
      .where({ user_name })
      .first();
  },
  comparePasswords(password, hash) {
    return bycrypt.compare(password, hash);
  },
  createJwt(subject, payload) {
    return jwt.sign(payload, config.JWT_SECRET, {
      subject,
      algorithm: 'HS256'
    });
  },
  parseBasicToken(token) {
    return Buffer.from(token, 'base64')
      .toString()
      .split(':');
  }
};

module.exports = AuthService;
