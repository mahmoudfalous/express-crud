const prisma = require('../config/prisma');

class PostService {
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
}

module.exports = PostService;
