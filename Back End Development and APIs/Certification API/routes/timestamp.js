const express = require('express');
const router = express.Router();

router.get('/api', (req, res) => {
    const date = new Date();
    res.json({unix: date.getTime(), utc: date.toUTCString()});
})
  
router.get('/api/:date', (req, res) => {
    let date = new Date(req.params.date);
    if(isNaN(date)) {
        date = new Date(Number(req.params.date));
    }
    if(isNaN(date)) return res.json({error: 'Invalid Date'});
    res.json({unix: date.getTime(), utc: date.toUTCString()});
});


module.exports = router;