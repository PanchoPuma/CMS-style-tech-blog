const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');



//Get all comments

router.get('/', (req, res) => {
    Comment.findAll({})
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

//Post comments 
router.post('/', withAuth, (req, res) => {
  if (req.session) {
    Comment.create({
      comment_textarea: req.body.comment_textarea,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

//Delete comments

router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
          id: req.params.id
        }
      })
        .then(dbCommentData => {
          if (!dbCommentData) {
            res.status(404).json({ message: 'No matching data with this ID' });
            return;
          }
          res.json(dbCommentData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

module.exports = router;