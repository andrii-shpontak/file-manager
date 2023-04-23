const express = require('express');
const rootRouter = require('./root');

const router = express.Router();

router.use('/', rootRouter);

module.exports = router;
