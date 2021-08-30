const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
//dtos
const Dtos = require("../dtos/dtos");

//update user
router.put("/:id", async (req, res) => {
  try {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      if (req.body.password) {
        const hashPassword = await bcrypt.hash(req.body.password, 3);
        req.body.password = hashPassword;
      }
    } else {
      return res
        .status(403)
        .json({ message: "вы не можите обновить ваш аккаунт" });
    }
    const user = await User.findOneAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    const userDtos = new Dtos(user);
    return res.status(200).json(userDtos);
  } catch (error) {
    console.log(error);
  }
});
//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findOneAndDelete(req.params.id);
      res.status(200).json({ message: "Аккаунт удален" });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({ message: error });
    }
  } else {
    return res.status(403).json({ message: "вы не можете удалить аккаунт" });
  }
});

//get a user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    if (!user) {
      return res
        .status(404)
        .json({ message: "не смогли найти пользователя с таким id" });
    }
    const userDtos = new Dtos(user);
    return res.status(200).json(userDtos);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

//get friend

router.get('/friends/:userId', async (req, res) => {
  try{
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map(friendId => {
        return User.findById(friendId)
      })
    );
   
 
    let friendList = [];
    friends.map(friend => {
      const {_id, username, profilePicture} = friend;
      friendList.push({_id, username, profilePicture})
    });
    res.status(200).json(friendList);
  }catch(err){
    res.status(500).json(err);
  }
})

//follow a user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        return res.status(200).json({ message: "пользователь подписался" });
      } else {
        return res
          .status(403)
          .json({ message: "вы уже подписаны на этого пользователся" });
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } else {
    res.status(403).json({ message: "вы ек можете подписаться на себя" });
  }
});
//unfollow a user

router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        return res.status(200).json({ message: "пользователь отписался" });
      } else {
        return res
          .status(403)
          .json({ message: "вы не можете отписатся от этого пользователя" });
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } else {
    res.status(403).json({ message: "вы не можете отписаться от себя" });
  }
});
module.exports = router;
