const prisma = require('../config/prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
  static async register({ email, password, name }) {
    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      return {
        success: false,
        message: "Email already exists",
        status: 422,
      };
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        name,
      },
    });

    return {
      success: true,
      user,
      status: 201,
    };
  }

  static async login({ email, password }) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        posts: {
          include: {
            comments: {
              include: {
                user: true
              }
            },
            user: true
          }
        }
      }
    });


    if (!user) {
      return {
        success: false,
        message: "Invalid email or password",
        status: 401,
      };
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return {
        success: false,
        message: "Invalid email or password",
        status: 401,
      };
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET
    );

    return {
      success: true,
      user,
      token,
      status: 200,
    };
  }
}

module.exports = AuthService;
