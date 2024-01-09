const Post = require("../model/postModel");
const User = require("../model/userModel");
const Comment = require("../model/commentModel");

const createPost = async (req, res) => {
  const { id } = req.user;

  const user = await User.findById(id).select("-password");

  if (user) {
    const { desc, image } = req.body;

    const newPost = new Post({
      desc,
      image,
      owner: user._id,
    });
    await newPost.save();

    res.json({
      msg: "Created Post!",
      newPost,
    });
  } else {
    res.status(404).json({ error: "User not found" });
  }
};
const getPost = async (req, res) => {
  const post = await Post.find({}).populate("owner").sort({ createdAt: -1 });
  if (post) {
    res.json({
      post,
    });
  } else {
    res.status(404).json({ error: "Post not found" });
  }
};
const userFollowingPosts = async (req, res) => {
  const { id } = req.user;
  const user = await User.findById(id)
    .select("-password")
    .populate("following");
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const followingIds = user.following.map((followingUser) => followingUser._id);
  const posts = await Post.find({
    $or: [{ owner: id }, { owner: { $in: followingIds } }],
  })
    .sort({ createdAt: -1 })
    .populate("owner");

  if (!posts) throw new Eror("error fetching posts");

  res.json({ posts });
};
const getUsersPost = async (req, res) => {
  const { username } = req.params;

  const userId = await User.findOne({ username }).select("-password");
  if (!userId) throw new Error("cannot find user");

  const userPost = await Post.find({ owner: userId._id })
    .sort({ createdAt: -1 })
    .populate("owner");

  if (!userPost) throw new Error("cannot get post");

  res.json({ userPost });
};
const updatePost = async (req, res) => {
  const { id } = req.params;
  const newPost = await Post.findByIdAndUpdate(
    id,
    {
      desc: req?.body?.desc,
    },
    {
      new: true,
    }
  ).populate("owner");

  if (!newPost) throw new Error("cannot find post");

  res.json({ newPost });
};
const deletePost = async (req, res) => {
  const { id } = req.params;
  const deletedPost = await Post.findByIdAndDelete(id);
  if (!deletedPost) throw new Error("cannot find the Post");

  res.json({ msg: "success" });
};
const likeDislike = async (req, res) => {
  const { id } = req.user;
  const { postId } = req.params;

  const user = await User.findById(id).select("-password");
  const post = await Post.findById(postId);

  if (!user || !post) {
    return res.status(404).json({ error: "User or Post not found" });
  }

  const isLiked = post.likes.includes(user._id);
  if (isLiked) {
    let likedislike = await Post.findOneAndUpdate(
      {
        _id: post._id,
      },
      {
        $pull: { likes: user._id },
      },
      { new: true }
    );
    res.json({ msg: "unliked", likedislike });
  } else {
    let likedislike = await Post.findOneAndUpdate(
      { _id: post._id },
      { $push: { likes: user._id } },
      { new: true }
    );
    res.json({ msg: "liked", likedislike });
  }
};

const addComment = async (req, res) => {
  const { id } = req.user;
  const { postId } = req.params;
  const { content } = req.body;

  const user = await User.findById(id).select("-password");
  const post = await Post.findById(postId);

  if (!user || !post) {
    return res.status(404).json({ error: "User or Post not found" });
  }

  const newComment = new Comment({
    content,
    owner: id,
  });
  await newComment.save();

  post.comments.push(newComment);
  await post.save();

  res.json({ msg: "success", comment: newComment });
};

const getAllComments = async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findById(postId);
  const comments = await Comment.find({
    _id: { $in: post.comments },
  }).populate({
    path: "owner",
    select: "username image",
  });

  if (!comments) throw new Error("cannot get comments");

  res.json({ comments });
};

const deleteComment = async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findByIdAndDelete(id);
  if (!comment) throw new Error("cannot find comment");

  await Post.findOneAndUpdate(
    { comments: { $in: [comment._id] } },
    { $pull: { comments: comment._id } }
  );

  res.json({ msg: "success" });
};

module.exports = {
  createPost,
  getPost,
  userFollowingPosts,
  getUsersPost,
  updatePost,
  deletePost,
  likeDislike,
  addComment,
  getAllComments,
  deleteComment,
};
