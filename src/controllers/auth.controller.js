const AuthService = require('../services/auth.service');
const {decorate, decorateWithPosts} = require("../decorators/user.decorate");

exports.register = async (req, res) => {
  const result = await AuthService.register(req.body);

  if (!result.success) {
    return res.status(result.status).json({
      message: result.message,
    });
  }
  let decoratedUser = decorate(result.user)
  res.status(result.status).json(decoratedUser);
};

exports.login = async (req, res) => {
  const result = await AuthService.login(req.body);

  if (!result.success) {
    return res.status(result.status).json({
      message: result.message,
    });
  }
  let decoratedUser = decorateWithPosts(result.user)
  res.status(result.status).json({
    user: decoratedUser,
    token: result.token,
  });
};
