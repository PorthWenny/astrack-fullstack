import prisma from "../lib/prisma.js";

export const getOwners = async (req, res) => {
  try {
    const owners = await prisma.owner.findMany();
    res.status(200).json(owners);
  } catch (error) {
    console.error("Get owners error:", error);
    res.status(500).json({ message: "Failed to get records" });
  }
};

export const getOwner = async (req, res) => {
  const { id } = req.params;

  try {
    const owner = await prisma.owner.findUnique({
      where: { id },
    });

    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    res.status(200).json(owner);
  } catch (error) {
    console.error("Get owner error:", error);
    res.status(500).json({ message: "Failed to get record" });
  }
};

export const addOwner = async (req, res) => {
  const body = req.body;

  try {
    const newOwner = await prisma.owner.create({
      data: {
        ...body,
      },
    });

    res.status(201).json(newOwner);
  } catch (error) {
    console.error("Add owner error:", error);
    res.status(500).json({ message: "Failed to create record" });
  }
};

export const updateOwner = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const updatedOwner = await prisma.owner.update({
      where: { id },
      data: {
        ...body,
      },
    });

    res.status(200).json(updatedOwner);
  } catch (error) {
    console.error("Update owner error:", error);
    if (error.code === "P2025") {
      res.status(404).json({ message: "Owner not found" });
    } else {
      res.status(500).json({ message: "Failed to update record" });
    }
  }
};

export const deleteOwner = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.owner.delete({
      where: { id },
    });

    res.status(200).json({ message: "Successfully deleted record" });
  } catch (error) {
    console.error("Delete owner error:", error);
    if (error.code === "P2025") {
      res.status(404).json({ message: "Owner not found" });
    } else {
      res.status(500).json({ message: "Failed to delete record" });
    }
  }
};
