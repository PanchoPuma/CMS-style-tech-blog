const { Post } = require('../models');

const postdata = [
  {
    title: 'Nunc purus.',
    post_url: 'http://desdev.cn/enim/blandit/mi.jpg',
    user_id: 4
  },
  {
    title: 'Pellentesque eget nunc.',
    post_url: 'http://google.ca/nam/nulla/integer.aspx',
    user_id: 7
  },
  {
    title: 'Morbi non quam nec dui luctus rutrum.',
    post_url: 'http://ucla.edu/consequat/nulla.html',
    user_id: 1
  },
  {
    title: 'Etiam justo.',
    post_url: 'https://shareasale.com/quis.json',
    user_id: 4
  },
  {
    title: 'Nulla ut erat id mauris vulputate elementum.',
    post_url: 'http://facebook.com',
    user_id: 6
  },
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;
