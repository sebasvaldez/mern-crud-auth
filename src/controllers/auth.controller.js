import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccesToken } from "../libs/jwt.js";


//registro de nuevo usuario
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.status(400).json(["El email ya esta registrado"]);
    }

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

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });

    if (!userFound) {
      return res.status(400).json(["Usuario no encontrado" ]);
    }

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) {
      return res.status(400).json(["Contraseña incorrecta" ]);
    }

    //creacion del token
    const token = await createAccesToken({ id: userFound._id });

    res.cookie("token", token);
    res.json({
      _id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createAt: userFound.createdAt,
    });
  } catch (error) {
    console.log(error);
  }
};

export const logOut = async (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });

  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound)
    return res.status(400).json(["Usuario no encontrado"]);

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createAt: userFound.createdAt,
    updateAt: userFound.updatedAt,
  });
};
