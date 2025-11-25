const express = require('express');
const multer = require('multer');
const uploadController = require('../controllers/uploadController');
const askController = require('../controllers/askController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('pdf'), uploadController.uploadPDF);
router.post('/ask', askController.askQuestion);

module.exports = router;
