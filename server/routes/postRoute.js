const express = require("express");
const {
  createPost,
  getPost,
  userFollowingPosts,
  getUsersPost,
  updatePost,
  deletePost,
  likeDislike,
} = require("../controller/postCtrl");
const authVerify = require("../middleware/auth");
const router = express.Router()

router.post("/create", authVerify, createPost);
router.put("/update/:id", authVerify, updatePost);
router.put("/like/:postId", authVerify, likeDislike);
router.get("/homepost", authVerify, userFollowingPosts);
router.get("/post/:id", authVerify, getPost);
router.get("/userpost/:username", authVerify, getUsersPost);
router.delete("/delete/:id", authVerify, deletePost);


module.exports = router;