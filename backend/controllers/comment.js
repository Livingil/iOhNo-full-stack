const Comment = require("../models/Comment");
const User = require("../models/User");

async function addComment(userId, comment) {
  const newComment = await Comment.create(comment);

  await User.findByIdAndUpdate(userId, { $push: { comments: newComment } });

  await newComment.populate("author");

  return newComment;
}

async function deleteComment(userId, commentId) {
  await Comment.deleteOne({ _id: commentId });
  await User.findByIdAndUpdate(userId, { $pull: { comments: commentId } });
}

module.exports = {
  addComment,
  deleteComment,
};
