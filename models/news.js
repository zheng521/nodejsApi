const marked = require('marked')
const News = require('../lib/mongo').News

module.exports = {
  getNews: function getNews () {
    return News
      .find()
      .exec()
  }
}
