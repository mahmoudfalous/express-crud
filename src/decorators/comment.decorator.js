exports.decorate = (comment,  currentUserId = null) => {
  return {
    id: comment.id,
    content: comment.content,
    authorName: comment.user?.name,

    isOwner: currentUserId
      ? comment.userId === currentUserId
      : false,
    createdAt: new Date(comment.createdAt).toLocaleDateString(),
  };
};
