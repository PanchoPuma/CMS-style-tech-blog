const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');


//get all 
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'post_textarea',
            'title',
        ],
        include: [
            {
                model: User,
                attributes: ['username', 'password', 'email']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_textarea', 'post_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username', 'password', 'email']
                }
            },
        ]
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


//get one
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_textarea',
            'title',
        ],
        include: [
            {
                model: User,
                attributes: ['username', 'password', 'email']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_textarea', 'post_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username', 'password', 'email']
                }
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No matching data found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});




//create a post
router.post('/', withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        post_textarea: req.body.post_content,
        user_id: req.session.user_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



//update posts
router.put('/:id', withAuth, (req, res) => {
    Post.update(req.body,
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No matching data found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
});



// delete posts
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No matching data found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
