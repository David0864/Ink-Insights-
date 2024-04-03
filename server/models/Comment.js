const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const commentSchema = new Schema({
  bookTitle: {
    type: String,
    required: 'You need to add a comment!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  bookAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  ratings: [
    {
      ratingText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;
