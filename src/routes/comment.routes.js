const router = require('express').Router({ mergeParams: true });
const controller = require('../controllers/comment.controller');
const auth = require('../middlewares/auth');

// GET /posts/:postId/comments
router.get('/', auth, controller.index);

// POST /posts/:postId/comments
router.post('/', auth, controller.create);

module.exports = router;
