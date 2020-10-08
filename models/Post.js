const { Schema, model, Types } = require('mongoose')

const Comment = require('./Comment')

const postSchema = new Schema({
    title: {
        type: String,
        require: true,
        trim: true,
        maxlength: 100
    },
    body: {
        type: String,
        require: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    thumbnail: String,
    readTime: String,
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    dislike: [{
        type: Schema, Types, ObjectId,
        ref: 'User'
    }],
    comment: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
}, {
    timestamps: true
})

const Post = model('Post', postSchema)

module.exports = Post