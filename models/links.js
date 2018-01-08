const marked = require('marked')
const Links = require('../lib/mongo').Links

module.exports = {
  getLinks: function getLinks () {
    return Links
      .find()
      .exec()
  }
}
