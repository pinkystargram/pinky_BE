const router = require('express').Router();

const user = require('../users');
const post = require('../posts');
const comment = require('../comments');

router.use('/users', user);
router.use('/posts', post);
router.use('/comments', comment);

module.exports = router;
