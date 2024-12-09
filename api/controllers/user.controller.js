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

  console.log("Request User ID from Token:", tokenUserId);
  console.log("Request Param ID:", id);

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

    res.status(200).json(rest);
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

export const saveFacility = async (req, res) => {
  const facilityId = req.body.facilityId;
  const tokenUserId = req.userId;

  try {
    const favorite = await prisma.favorites.findUnique({
      where: {
        userId_facilityId: {
          userId: tokenUserId,
          facilityId,
        },
      },
    });

    if (favorite) {
      await prisma.favorites.delete({
        where: {
          id: favorite.id,
        },
      });
      return res
        .status(200)
        .json({ message: "Facility removed from favorites" });
    } else {
      await prisma.favorites.create({
        data: {
          userId: tokenUserId,
          facilityId,
        },
      });
      return res.status(200).json({ message: "Facility added to favorites" });
    }
  } catch (error) {
    console.error("Error saving facility to favorites:", error.message);
    return res
      .status(500)
      .json({ message: "An error occurred while saving the facility" });
  }
};

export const getUserFavorites = async (req, res) => {
  const userId = req.userId;

  console.log("Fetching favorites for user:", userId);

  try {
    const favorites = await prisma.favorites.findMany({
      where: { userId },
      include: { facility: true },
    });

    console.log("Favorites fetched:", favorites);
    res.status(200).json(favorites);
  } catch (error) {
    console.error("Error fetching favorites:", error.message);
    res.status(500).json({ message: "Failed to fetch user favorites" });
  }
};
