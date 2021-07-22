const { Post } = require('../models');

const postdata = [
  {
    title: 'Nunc purus.',
    content: 'Nunc purus',
    user_id: 4
  },
  {
    title: 'Pellentesque eget nunc.',
    content: 'Pellentesque eget nunc',
    user_id: 7
  },
  {
    title: 'Morbi non quam nec dui luctus rutrum.',
    content: 'Morbi non quam nec dui luctus rutruml',
    user_id: 1
  },
  {
    title: 'Etiam justo.',
    content: 'Etiam justo',
    user_id: 4
  },
  {
    title: 'Nulla ut erat id mauris vulputate elementum.',
    content: 'Nulla ut erat id mauris vulputate elementum',
    user_id: 6
  },
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;
