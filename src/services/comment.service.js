const prisma = require('../config/prisma');

class CommentService {
  static async create({ content, postId, userId }) {
    return prisma.comment.create({
      data: {
        content,
        postId,
        userId,
      },
      include: {
        user: true,
      },
    });
  }

  static async allForPost(postId) {
    return prisma.comment.findMany({
      where: { postId },
      include: { user: true },
    });
  }
}

module.exports = CommentService;
