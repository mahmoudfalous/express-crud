// post.decorator.js
const commentDecorator = require('./comment.decorator');
exports.decorate = (post, currentUserId = null) => {
  return {
    id: post.id,
    title: post.title,
    body: post.body,

    authorName: post.user?.name,

    commentsCount: post.comments?.length || 0,
    comments: post.comments?.map(comment =>
      commentDecorator.decorate(comment, currentUserId)
    ) || [],

    isOwner: currentUserId ? post.userId === currentUserId : false,
    createdAt: new Date(post.createdAt).toLocaleDateString(),
  };
};
