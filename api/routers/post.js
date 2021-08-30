const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
//create post

router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savePost = await newPost.save();
    return res.status(200).json(savePost);
  } catch (error) {
    console.log("err", error);
    res.status(500).json({ message: error.message });
  }
});

//update post

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      const userPost = await post.updateOne({ $set: req.body }, { new: true });
      return res.status(200).json(userPost);
    } else {
      return res
        .status(403)
        .json({ message: "вы можете обновить только свой пост" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//delete post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      return res.status(200).json({ message: "пост удален" });
    } else {
      return res
        .status(403)
        .json({ message: "вы можете удалять только свои посты" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//like/dislike post

router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log('thth', req.body.userId)
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      return res.status(200).json({ message: "вы поставили лайк" });
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      return res.status(200).json({ message: "вы удалили лайк" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
//get post

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//get timeline posts

router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);

    const userPost = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPost.concat(...friendPosts));
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: error.message });
  }
});
//get users all post posts

router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({username : req.params.username})
    const posts = await Post.find({userId : user._id});
    res.status(200).json(posts); 
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
