const marked = require('marked')
const Link = require('../lib/mongo').Link

module.exports = {
  getLinks: function getLinks () {
    return Link
      .find()
      .sort({ _id: -1 })
      .exec()
  }
}
