const passport = require('passport');
const bcrypt = require('bcrypt');

module.exports = function (app, myDataBase) {
    app.route('/').get((req, res) => {
        res.render('pug/index', {title: 'Connected to Database', message: 'Please login', showLogin: true, showRegistration: true, showSocialAuth: true});
    });
    
    app.route('/register').post((req, res, next) => { // First handler
        if(!req.body.username || !req.body.password) next(new Error('Missing username or password'));
        myDataBase.findOne({username: req.body.username}, (err, user) => {
            if(err) next(err);
            if(user) res.redirect('/');
            const hash = bcrypt.hashSync(req.body.password, 12);
            myDataBase.insertOne({username: req.body.username, password: hash}, (err, user) => {
                if(err) next(err);
                next(null, user.ops[0]);
            });
        });
    },
    passport.authenticate('local', {failureRedirect: '/'}), // Second handler
    (req, res) => res.redirect('/profile')); // Third handler 
    
    app.post('/login', passport.authenticate('local', {failureRedirect: '/'}), (req, res) => {
        res.redirect('/profile');
    });

    app.get('/auth/github', passport.authenticate('github'));
    app.get('/auth/github/callback', passport.authenticate('github', {failureRedirect: '/'}), (req, res) => {
        res.redirect('/profile');        
    });
    
    app.get('/profile', ensureAuthenticated, (req, res) => {
        res.render('pug/profile', {username: req.user.username});
    });
      
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/chat', (req, res) => {
        res.render('pug/chat');
    })

    app.use((req, res, next) => res.status(404).type('text').send('Not Found'));
}

function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()) return next();
    res.redirect('/');
}