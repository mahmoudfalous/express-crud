const PostService = require('../services/post.service');
const {decorate} = require("../decorators/post.decorator");

exports.index = async (req, res) => {
  const posts = await PostService.all();
  const decorated = posts.map(post =>
    decorate(post, req.userId)
  );

  res.json(decorated);
};

exports.create = async (req, res) => {
  const post = await PostService.create(req.userId, req.body);
  res.status(201).json(post);
};
