const router = require('express').Router();

const user = require('../users');
const post = require('../posts');
const comment = require('../comments');
const like = require('../likes');
const bookmark = require('../bookmarks');

router.use('/users', user);
router.use('/posts', post);
router.use('/comments', comment);
router.use('/likes', like);
router.use('/bookmarks', bookmark);

module.exports = router;
