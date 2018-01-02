const marked = require('marked')
const Comment = require('../lib/mongo').Comment

Comment.plugin('contentToHtml', {
	afterFind: function (comments) {
		return comments.map(function (comment) {
			comment.content = marked(comment.content)
			return comment
		})
	}
})

module.exports = {
	create: function create (comment) {
		return Comment.create(comment).exec()
	},

	getCommentById: function getCommentById (commentId) {
		return Comment.findOne({ _id: commentId }).exec()
	},

	delCommentById: function delCommentById (commentId) {
		return Comment.remove({ _id: commentId }).exec()
	},

	delCommentByPostId: function delCommentByPostId (postId) {
		return Comment.remove({ postId: postId}).exec()
	},

	getComments: function getComments (postId) {
		return Comment
			.find({ postId: postId })
			.populate({ path: 'author', model: 'User'})
			.sort({_id: 1})
			.addCreatedAt()
			.contentToHtml()
			.exec()
	},

	getCommentsCount: function getCommentsCount (postId) {
		return Comment.count({ postId: postId }).exec()
	}

}
