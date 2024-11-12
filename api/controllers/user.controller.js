import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to get users" });
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await prisma.users.findUnique({
      where: { id },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to get user" });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const { password, avatar, ...inputs } = req.body;

  if (id !== tokenUserId) {
    return res.status(403).json({ message: "You are not authorized" });
  }

  let updatedPass = null;
  try {
    if (password) {
      updatedPass = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.users.update({
      where: { id },
      data: {
        ...inputs,
        ...(updatedPass && { password: updatedPass }),
        ...(avatar && { avatar }),
      },
    });

    const { password: userPass, ...rest } = updatedUser;

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Failed to update users" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  if (id !== tokenUserId) {
    return res.status(403).json({ message: "You are not authorized" });
  }

  try {
    await prisma.users.delete({
      where: { id },
    });
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete users" });
  }
};
