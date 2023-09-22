import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccesToken } from "../libs/jwt.js";

//registro de nuevo usuario
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10); //encripta la contraseña con 10 vueltas de encriptacion
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });
    const userSaved = await newUser.save();

    //creacion del token
    const token = await createAccesToken({ id: userSaved._id });

    res.cookie("token", token);
    res.json({
      _id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createAt: userSaved.createdAt,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = (req, res) => {
  res.send("login");
};
