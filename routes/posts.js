var express = require('express');
var router = express.Router();

var PostsController = require('../controllers/posts')

router.get('/', PostsController.Index);
router.post('/', PostsController.Create);
router.get('/new', PostsController.New);
router.delete('/:postId', PostsController.Delete); //added
router.put('/:postId/like', PostsController.Like); //added

module.exports = router;
