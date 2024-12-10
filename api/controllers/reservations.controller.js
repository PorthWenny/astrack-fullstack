import prisma from "../lib/prisma.js";

export const getReservations = async (req, res) => {
  try {
    const reservations = await prisma.reservations.findMany({
      include: {
        user: true,
        facility: true,
      },
    });
    console.log("Reservations:", reservations);
    res.status(200).json(reservations);
  } catch (error) {
    console.log("Error fetching reservations:", error);
    res.status(500).json({ message: "Failed to get reservations" });
  }
};

export const getReservation = async (req, res) => {
  const id = req.params.id;
  console.log("Requested Reservation ID:", id);

  try {
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({ message: "Invalid reservation ID" });
    }

    const reservation = await prisma.reservations.findUnique({
      where: { id },
      include: {
        user: true,
        facility: true,
      },
    });

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    res.status(200).json(reservation);
  } catch (error) {
    console.log("Error fetching reservation:", error);
    res.status(500).json({ message: "Failed to get reservation" });
  }
};

export const addReservation = async (req, res) => {
  const {
    userId,
    facilityId,
    rsvDate,
    rsvTime,
    title,
    department,
    description,
    progress,
  } = req.body;

  try {
    const newReservation = await prisma.reservations.create({
      data: {
        userId,
        facilityId,
        rsvDate,
        rsvTime,
        title,
        department,
        description,
        progress,
      },
    });

    res.status(200).json(newReservation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create reservation" });
  }
};

export const updReservation = async (req, res) => {
  const id = req.params.id;
  const { progress, title, department, description, userId, facilityId } =
    req.body;

  try {
    const updatedReservation = await prisma.reservations.update({
      where: { id },
      data: {
        progress,
        title,
        department,
        description,
        userId,
        facilityId,
      },
      include: {
        user: true,
        facility: true,
      },
    });

    res.status(200).json(updatedReservation);
  } catch (error) {
    console.log("Error updating reservation:", error);
    if (error.code === "P2025") {
      res.status(404).json({ message: "Reservation not found" });
    } else {
      res.status(500).json({ message: "Failed to update reservation" });
    }
  }
};

export const delReservation = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.reservations.delete({
      where: { id },
    });

    res.status(200).json({ message: "Successfully deleted reservation" });
  } catch (error) {
    console.log("Delete reservation error:", error);
    if (error.code === "P2025") {
      res.status(404).json({ message: "Reservation not found" });
    } else {
      res.status(500).json({ message: "Failed to delete reservation" });
    }
  }
};
