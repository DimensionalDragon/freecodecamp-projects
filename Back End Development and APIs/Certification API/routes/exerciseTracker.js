const express = require('express');
const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use('/api/users/:_id', getUserById);

const User = require('../models/user');
const Exercise = require('../models/exercise');

router.post('/api/users', (req, res) => {
    if(!req.body.username) return res.json({error: 'No username provided'});
    const {username} = req.body
    User.findOne({username}, (err, user) => {
        if(err) return res.json({error: 'Error finding user'});
        if(user) return res.json({error:'Username already exists'});
        const newUser = new User({username});
        newUser.save((err, user) => {
            if(err) return res.json({error: 'Error saving user'});
            res.json(user);
        });
    });
});

router.get('/api/users', (req, res) => {
    User.find((err, users) => {
        if(err) return res.json({error: 'Error finding users'});
        res.json(users);
    });
});

router.post('/api/users/:_id/exercises', (req, res) => {
    if(!req.body.description) return res.json({error: 'No description provided'});
    if(!req.body.duration) return res.json({error: 'No duration provided'});
    const {description, duration} = req.body;
    const {username, _id} = req.user;
    const date = req.body.date ? new Date(req.body.date) : new Date();
    const newExercise = new Exercise({username, description, duration, date});
    newExercise.save((err, exercise) => {
        if(err) return res.json({error: 'Error saving exercise'});
        const {username, description, duration} = exercise;
        res.json({_id, username, description, duration, date: exercise.date.toDateString()});
    });
});

router.get('/api/users/:_id/logs', (req, res) => {
    const query = Exercise.find({username: req.user.username});
    if(req.query.from) query.where('date').gte(new Date(req.query.from));
    if(req.query.to) query.where('date').lte(new Date(req.query.to));
    if(req.query.limit) query.limit(req.query.limit);
    query.exec((err, exercises) => {
        if(err) return res.json({error: 'Error finding exercises'});
        const {_id, username} = req.user;
        const mappedExercises = exercises.map(({description, duration, date}) => ({description, duration, date: date.toDateString()}));
        res.json({_id, username, count: exercises.length, log: mappedExercises});
    });
});

function getUserById(req, res, next) {
    if(!req.params._id) return res.json({error: 'No user id provided'});
    User.findById(req.params._id, (err, user) => {
        if(err) return res.json({error: 'Error finding user'});
        if(!user) return res.json({error: 'User not found'});
        req.user = user;
        next();
    });
}

module.exports = router;