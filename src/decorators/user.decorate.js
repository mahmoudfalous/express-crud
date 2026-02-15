const PostDecorator = require('./post.decorator');

exports.decorate = (user) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

exports.decorateWithPosts = (user) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    posts: user.posts?.map(post =>
      PostDecorator.decorate(post , user.id)
    ) || [],
  };
};
