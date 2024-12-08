import prisma from "../lib/prisma.js";

export const getFacilities = async (req, res) => {
  try {
    console.log("GET /api/facilities - Received request");
    const facilities = await prisma.facilities.findMany();

    res.status(200).json(facilities);
  } catch (error) {
    console.error("Error in getFacilities:", error.message);
    res.status(500).json({ message: "Failed to get records" });
  }
};

export const getFacility = async (req, res) => {
  const id = req.params.id;
  try {
    const facility = await prisma.facilities.findUnique({
      where: { id },
    });

    res.status(200).json(facility);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get records" });
  }
};

export const addFacility = async (req, res) => {
  const body = req.body;

  try {
    const newFacility = await prisma.facilities.create({
      data: {
        ...body,
      },
    });

    res.status(200).json(newFacility);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get records" });
  }
};

export const updFacility = async (req, res) => {
  try {
    res.status(200).json();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get records" });
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
    console.log("Delete facility error:", error);
    if (error.code === "P2025") {
      res.status(404).json({ message: "Facility not found" });
    } else {
      res.status(500).json({ message: "Failed to delete record" });
    }
  }
};
