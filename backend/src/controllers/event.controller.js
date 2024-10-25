import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createEvent = async (req, res) => {
  try {
    const { title, description, startTime, endTime } = req.body;
    const userId = req.user.id;

    const event = await prisma.event.create({
      data: {
        title,
        description,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        userId,
      },
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: "Could not create event" });
  }
};

export const getEvents = async (req, res) => {
  try {
    const userId = req.user.id;
    const { startDate, endDate } = req.query;

    const whereClause = {
      userId,
      ...(startDate && endDate
        ? {
            AND: [
              { startTime: { gte: new Date(startDate) } },
              { endTime: { lte: new Date(endDate) } },
            ],
          }
        : {}),
    };

    const events = await prisma.event.findMany({
      where: whereClause,
      orderBy: {
        startTime: "asc",
      },
    });

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch events" });
  }
};

export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const event = await prisma.event.findFirst({
      where: {
        id: parseInt(id),
        userId,
      },
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch event" });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, startTime, endTime } = req.body;
    const userId = req.user.id;

    const event = await prisma.event.findFirst({
      where: {
        id: parseInt(id),
        userId,
      },
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const updatedEvent = await prisma.event.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      },
    });

    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: "Could not update event" });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const event = await prisma.event.findFirst({
      where: {
        id: parseInt(id),
        userId,
      },
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await prisma.event.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Could not delete event" });
  }
};
