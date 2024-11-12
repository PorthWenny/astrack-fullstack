import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // hashing
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    // save new user
    const newUser = await prisma.users.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    console.log(newUser);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create user" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // check if existing
    const user = await prisma.users.findUnique({
      where: { username },
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    // check user-pass match
    const isPassValid = await bcrypt.compare(password, user.password);

    if (!isPassValid) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    // generate cookie token and send back
    const age = 1000 * 60 * 60 * 24 * 7; // --> 7 days

    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: false,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: age,
      }
    );

    const { password: userPass, ...userInfo } = user;

    res
      .cookie("token", token, {
        httpOnly: true,
        // secure: true,
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to login" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout successful" });
};
