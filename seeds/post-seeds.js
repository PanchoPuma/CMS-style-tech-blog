const { Post } = require('../models');

const postdata = [
  {
    title: 'Nunc purus.',
    post_textarea: 'Nunc purus',
    user_id: 4
  },
  {
    title: 'Pellentesque eget nunc.',
    post_textarea: 'Pellentesque eget nunc',
    user_id: 7
  },
  {
    title: 'Morbi non quam nec dui luctus rutrum.',
    post_textarea: 'Morbi non quam nec dui luctus rutruml',
    user_id: 1
  },
  {
    title: 'Etiam justo.',
    post_textarea: 'Etiam justo',
    user_id: 4
  },
  {
    title: 'Nulla ut erat id mauris vulputate elementum.',
    post_textarea: 'Nulla ut erat id mauris vulputate elementum',
    user_id: 6
  },
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;
