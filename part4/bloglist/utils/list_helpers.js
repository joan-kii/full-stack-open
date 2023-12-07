// eslint-disable-next-line import/no-extraneous-dependencies
const _ = require('lodash');

const dummy = (_blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((acc, blog) => acc + blog.likes, 0);

const favouriteBlog = (blogs) => blogs.reduce((fav, blog) => {
  const { title, author, likes } = blog.likes > fav.likes ? blog : fav;
  return { title, author, likes };
}, blogs[0]);

const mostBlogs = (blogsList) => {
  let blogs = 0;
  let author = '';
  const blogsCount = _.countBy(blogsList, 'author');
  _.forOwn(blogsCount, (value, key) => {
    if (value > blogs) {
      author = key;
      blogs = value;
    }
  });

  return { author, blogs };
};

const mostLikes = (blogsList) => {
  const blogsPerAuthor = _.groupBy(blogsList, 'author');
  const likesPerAuthor = _.mapValues(blogsPerAuthor, (blogs) => _.mapValues(blogs, 'likes'));
  const authors = _.map(likesPerAuthor, (likes, name) => ({
    author: name,
    likes: _.sum(_.values(likes)),
  }));
  return _.orderBy(authors, 'likes', 'desc')[0];
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
