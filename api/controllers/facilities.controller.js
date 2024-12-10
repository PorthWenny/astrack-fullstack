import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const getFacilities = async (req, res) => {
  const { title, type } = req.query;

  try {
    const facilities = await prisma.facilities.findMany({
      where: {
        title: title
          ? {
              contains: title,
              mode: "insensitive",
            }
          : undefined,
        type: type || undefined,
      },
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

export const getFacilityTypes = async (req, res) => {
  try {
    const types = await prisma.facilities.findMany({
      select: {
        type: true,
      },
      distinct: ["type"],
    });

    const uniqueTypes = types.map((facility) => facility.type);
    res.status(200).json(uniqueTypes);
  } catch (error) {
    console.error("Error fetching types:", error.message);
    res.status(500).json({ message: "Failed to fetch facility types" });
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

    const token = req.cookies?.token;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (!err) {
          const fave = await prisma.favorites.findUnique({
            where: {
              userId_facilityId: {
                userId: payload.id,
                facilityId: id,
              },
            },
          });
          res
            .status(200)
            .json({ ...facility, isFavorite: fave ? true : false });
        }
      });
    }
    res.status(200).json({ ...facility, isFavorite: false });

    if (!facility) {
      return res.status(404).json({ message: "Facility not found" });
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Failed to get record" });
  }
};

export const addFacility = async (req, res) => {
  const body = req.body;
  console.log("Request body received at backend:", body); // Debug incoming data

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
    console.error("Full Error:", error);
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
