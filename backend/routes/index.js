const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.json({msg: 'Hello from backend'});
});

module.exports = router;
