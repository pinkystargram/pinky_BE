const express = require('express');
const router = express.Router();

const searchController = require('./controller/search.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware.auth, searchController.search);

module.exports = router;
