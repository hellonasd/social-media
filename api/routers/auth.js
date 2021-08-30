const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

//dtos
const Dtos = require('../dtos/dtos');
//registration

router.post("/registration", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const candidate = await User.findOne({ email });
    if (candidate) {
      return res
        .status(400)
        .json({ message: "пользователь с таким email уже существует" });
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const user = await User.create({
      username,
      email,
      password: hashPassword,
    });
    const userDtos = new Dtos(user)
    return res.status(200).json(userDtos);
  } catch (error) {
    console.log(error);
    return res.status(404).json(error);
  }
});

//login

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "пользователь с таким email не найден" });
    };
    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword){
      return res.status(400).json({message : 'неверный пароль'})
    }
    const userDtos = new Dtos(user)
    return res.status(200).json(userDtos);
  } catch (error) {
    console.log("erro", error);
    return res.status(500).json({ message: error });
  }
});

module.exports = router;
