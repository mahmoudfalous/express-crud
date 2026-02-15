const router = require('express').Router();
const controller = require('../controllers/post.controller');
const auth = require('../middlewares/auth');
const commentRoutes = require('./comment.routes');

router.get('/',auth, controller.index);
router.post('/', auth, controller.create);
router.use('/:postId/comments', commentRoutes);
module.exports = router;
