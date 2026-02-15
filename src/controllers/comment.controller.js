const CommentService = require('../services/comment.service');
const {decorate} = require("../decorators/comment.decorator");

exports.index = async (req, res) => {
  const postId = Number(req.params.postId);

  const comments = await CommentService.allForPost(postId);
const decoratedComments = comments.map(comment => {
 return  decorate(comment, req.userId)
});
  res.json(decoratedComments);
};

exports.create = async (req, res) => {
  const postId = Number(req.params.postId);

  const comment = await CommentService.create({
    content: req.body.content,
    postId,
    userId: req.userId,
  });

  res.status(201).json(comment);
};
