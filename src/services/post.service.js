const prisma = require('../config/prisma');

class PostService {

  static async _findOwnedPost(id, userId) {
    const post = await prisma.post.findUnique({
      where: { id }
    });

    if (!post) {
      return {
        success: false,
        message: "Post not found",
        status: 404,
      };
    }

    if (post.userId !== userId) {
      return {
        success: false,
        message: "Unauthorized",
        status: 403,
      };
    }

    return { success: true, post };
  }

  static async create(userId, data) {
    return prisma.post.create({
      data: {
        title: data.title,
        body: data.body,
        userId,
      },
    });
  }

  static async all() {
    return prisma.post.findMany({
      include: { user: true , comments : true},
    });
  }

  static async update(id, userId, data) {

    const result = await this._findOwnedPost(id, userId);
    if (!result.success) return result;

    const updated = await prisma.post.update({
      where: { id },
      data: {
        title: data.title,
        body: data.body,
      },
    });

    return {
      success: true,
      post: updated,
      status: 200,
    };
  }

  static async delete(id, userId) {

    const result = await this._findOwnedPost(id, userId);
    if (!result.success) return result;

    await prisma.post.delete({
      where: { id },
    });

    return {
      success: true,
      status: 204,
      message: "Post deleted successfully",
    };
  }
}

module.exports = PostService;
