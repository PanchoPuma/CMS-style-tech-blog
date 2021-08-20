const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');



//Get all 
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Get One

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_textarea', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            },
            {
                model: Post,
                attributes: ['id', 'title', 'post_textarea', 'created_at']
            },
        ]

    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No matching data found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


// Create
router.post('/', (req, res) => {
    User.create({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    })
        .then(dbUserData => {
            req.session.save(() => {
                req.session.loggedIn = true;
                req.session.username = dbUserData.username;
                req.session.user_id = dbUserData.id;

                res.json(dbUserData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Login
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'Invalid email!' });
            return;
        }
        const validPassword = dbUserData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Invalid password!' });
            return;
        }
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.username = dbUserData.username;
            req.session.user_id = dbUserData.id;

            res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    });
});

//logout

// Update

// Delete 