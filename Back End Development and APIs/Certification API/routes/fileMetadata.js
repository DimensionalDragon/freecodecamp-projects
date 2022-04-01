const express = require('express');
const router = express.Router();
const fs = require('fs');

const multer = require('multer');
const upload = multer({dest: 'tmp/'});

router.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
    if(!req.file) return res.json({error: 'No file uploaded'});
    fs.unlink('tmp/' + req.file.filename, err => err ? console.log(err) : null);
    res.json({name: req.file.originalname, type: req.file.mimetype, size: req.file.size});
});

module.exports = router;