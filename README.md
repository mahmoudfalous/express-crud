# Express Blog

This is a simple blog application built with Express.js and Prisma ORM.

## Project Structure

```
express-blog/
├── package.json
├── prisma.config.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│       ├── migration_lock.toml
│       ├── 20260214234242_init_blog/
│       │   └── migration.sql
│       └── 20260215010128_add_user_to_comment/
│           └── migration.sql
├── src/
│   ├── app.js
│   ├── config/
│   │   └── prisma.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── comment.controller.js
│   │   └── post.controller.js
│   ├── decorators/
│   │   ├── comment.decorator.js
│   │   ├── post.decorator.js
│   │   └── user.decorate.js
│   ├── middlewares/
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── comment.routes.js
│   │   └── post.routes.js
│   └── services/
│       ├── auth.service.js
│       ├── comment.service.js
│       └── post.service.js
```

## Folders and Files

- **prisma/**: Contains Prisma schema and migration files.
- **src/**: Main source code for the application.
  - **config/**: Configuration files (e.g., Prisma client setup).
  - **controllers/**: Route handler logic for authentication, posts, and comments.
  - **decorators/**: Decorator utilities for models.
  - **middlewares/**: Express middlewares (e.g., authentication).
  - **routes/**: Express route definitions.
  - **services/**: Business logic and service layer.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set up your database and run migrations:
   ```bash
   npx prisma migrate deploy
   ```
3. Start the server:
   ```bash
   npm start
   ```

## API Routes

### Auth

- **POST /auth/register**
   - Register a new user
   - Example:
      ```bash
      curl -X POST http://localhost:3000/auth/register \
         -H 'Content-Type: application/json' \
         -d '{"name": "User1", "email": "user1@example.com", "password": "pass123"}'
      ```

- **POST /auth/login**
   - Login and receive a token
   - Example:
      ```bash
      curl -X POST http://localhost:3000/auth/login \
         -H 'Content-Type: application/json' \
         -d '{"email": "user1@example.com", "password": "pass123"}'
      ```

### Posts

- **GET /posts** _(auth required)_
   - Get all posts
   - Example:
      ```bash
      curl -H 'Authorization: Bearer <token>' http://localhost:3000/posts
      ```

- **POST /posts** _(auth required)_
   - Create a new post
   - Example:
      ```bash
      curl -X POST http://localhost:3000/posts \
         -H 'Authorization: Bearer <token>' \
         -H 'Content-Type: application/json' \
         -d '{"title": "My Post", "body": "Hello world!"}'
      ```

### Comments (nested under posts)

- **GET /posts/:postId/comments** _(auth required)_
   - Get all comments for a post
   - Example:
      ```bash
      curl -H 'Authorization: Bearer <token>' http://localhost:3000/posts/1/comments
      ```

- **POST /posts/:postId/comments** _(auth required)_
   - Add a comment to a post
   - Example:
      ```bash
      curl -X POST http://localhost:3000/posts/1/comments \
         -H 'Authorization: Bearer <token>' \
         -H 'Content-Type: application/json' \
         -d '{"content": "Nice post!"}'
      ```

## License

MIT
