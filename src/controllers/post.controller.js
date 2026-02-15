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

exports.update = async (req, res) => {

  console.log("Updating post with id:", req.params.id, "by user:", req.userId);
  const { id } = req.params;
  const intId = parseInt(id, 10);
  if (isNaN(intId)) {
    return res.status(400).json({ message: "Invalid post ID" });
  }
  const result = await PostService.update(intId, req.userId, req.body);

  if (!result.success) {
    return res.status(result.status).json({ message: result.message });
  }

  const post = result.post ;
  const decorated = decorate(post, req.userId);
  res.json(decorated);
}

exports.delete = async (req, res) => {
  const { id } = req.params;
  const intId = parseInt(id, 10);
  if (isNaN(intId)) {
    return res.status(400).json({ message: "Invalid post ID" });
  }
  const result = await PostService.delete(intId, req.userId);

  if (!result.success) {
    return res.status(result.status).json({ message: result.message });
  }

  res.status(result.status).json({ message: result.message });
}