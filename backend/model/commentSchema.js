const mongooose = require('mongoose');

const commentSchema = new mongooose.Schema({
    comment: {
        type: String,
        required: true
    },
    blogId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

// collection creation
const Comment = mongooose.model('COMMENT', commentSchema);

module.exports = { commentSchema, Comment}