const express = require('express');
const multer = require('multer');
const path = require('path');

const { uploadHandler } = require('../controllers/uploadController');
const { askHandler } = require('../controllers/qaController');

const router = express.Router();

// multer config
const upload = multer({
  dest: path.join(__dirname, '../../uploads'),
});

// test
router.get('/test', (req, res) => {
  res.json({ ok: true });
});

// upload
router.post('/upload', upload.single('file'), uploadHandler);

// ask
router.post('/ask', askHandler);

module.exports = router;

