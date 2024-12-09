import prisma from "../lib/prisma.js";

export const checkAdmin = async (req, res, next) => {
  try {
    const user = await prisma.users.findUnique({
      where: { id: req.userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isAdmin) {
      return res
        .status(403)
        .json({ message: "Forbidden: Admin access required" });
    }

    next();
  } catch (error) {
    console.error("Error in checkAdmin middleware:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
