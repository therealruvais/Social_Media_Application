const express = require("express");
const {
  createPost,
  getPost,
  userFollowingPosts,
  getUsersPost,
  updatePost,
} = require("../controller/postCtrl");
const authVerify = require("../middleware/auth");
const router = express.Router()

router.post("/create", authVerify, createPost);
router.put("/update/:id", authVerify, updatePost);
router.get("/homepost", authVerify, userFollowingPosts);
router.get("/post/:id", authVerify, getPost);
router.get("/userpost/:username", authVerify, getUsersPost);


module.exports = router;