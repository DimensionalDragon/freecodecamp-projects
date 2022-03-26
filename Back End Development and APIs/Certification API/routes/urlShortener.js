const dns = require('dns');
const express = require('express');
const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

const Link = require('../models/link');

router.post('/api/shorturl', (req, res) => {
    if(!req.body.url) return res.json({error: 'No URL provided'});
    const {url} = req.body;
    const tld = url.split('/?')[0].split('.').slice(-1)[0];
    if(tld.match(/[A-Z]/g)) return res.json({error: 'invalid url'}); // Check if TLD contains uppercase letters
    let urlObject;
    try {
        urlObject = new URL(url); // URL Object turns TLD to lowercase, hence the previous check
    } catch(err) {
        return res.json({error: 'invalid url'});
    }
    const hostname = urlObject.hostname;
    dns.lookup(hostname, (err, address) => {
        if(err || !address) return res.json({error: 'invalid url'});
        Link.findOne({originalUrl: url}, (err, link) => {
            if(err) return res.json({error: 'invalid url'});
            if(link) return res.json({original_url: link.originalUrl, short_url: link.shortUrl});
            const newLink = new Link({originalUrl: url});
            newLink.save((err, link) => {
                if(err) return res.status(500).json({error: 'Internal Server Error'});
                res.json({original_url: link.originalUrl, short_url: link.shortUrl});
            });
        });
    });
});

router.get('/api/shorturl/:id', (req, res) => {
    Link.findOne({shortUrl: req.params.id}, (err, link) => {
        if(err) return res.json({error: 'Internal Server Error'})
        if(!link) return res.redirect('/url-shortener');
        res.redirect(link.originalUrl);
    });
});

module.exports = router;