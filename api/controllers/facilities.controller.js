import prisma from "../lib/prisma.js";

export const getFacilities = async (req, res) => {
  try {
    const facilities = await prisma.facilities.findMany({
      include: {
        owner: true,
      },
    });

    res.status(200).json(facilities);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Failed to get records" });
  }
};

export const getFacility = async (req, res) => {
  const id = req.params.id;
  try {
    const facility = await prisma.facilities.findUnique({
      where: { id },
      include: {
        owner: true,
      },
    });

    if (!facility) {
      return res.status(404).json({ message: "Facility not found" });
    }

    res.status(200).json(facility);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Failed to get record" });
  }
};

export const addFacility = async (req, res) => {
  const body = req.body;

  try {
    const newFacility = await prisma.facilities.create({
      data: {
        title: body.title,
        location: body.location,
        latitude: body.latitude,
        longitude: body.longitude,
        description: body.description,
        img: body.img,
        type: body.type,
        floor: body.floor,
        openHours: body.openHours,
        owner: body.ownerId
          ? {
              connect: { id: body.ownerId },
            }
          : undefined,
      },
    });

    res.status(201).json(newFacility);
  } catch (error) {
    console.error("Error adding facility:", error.message);
    res.status(500).json({ message: "Failed to create facility" });
  }
};

export const updFacility = async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  try {
    const updatedFacility = await prisma.facilities.update({
      where: { id },
      data: {
        title: body.title,
        location: body.location,
        latitude: body.latitude,
        longitude: body.longitude,
        description: body.description,
        img: body.img,
        type: body.type,
        floor: body.floor,
        openHours: body.openHours,
        owner: body.ownerId
          ? {
              connect: { id: body.ownerId },
            }
          : undefined,
      },
      include: {
        owner: true,
      },
    });

    res.status(200).json(updatedFacility);
  } catch (error) {
    console.error("Error on update:", error.message);
    if (error.code === "P2025") {
      res.status(404).json({ message: "Facility not found" });
    } else {
      res.status(500).json({ message: "Failed to update facility" });
    }
  }
};

export const delFacility = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.facilities.delete({
      where: { id },
    });

    res.status(200).json({ message: "Successfully deleted record" });
  } catch (error) {
    console.error("Delete facility error:", error.message);
    if (error.code === "P2025") {
      res.status(404).json({ message: "Facility not found" });
    } else {
      res.status(500).json({ message: "Failed to delete record" });
    }
  }
};
