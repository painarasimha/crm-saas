const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getNotes = async (req, res) => {
  try {
    const notes = await prisma.note.findMany({
      where: { userId: req.user.userId },
    });
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching notes.' });
  }
};

const createNote = async (req, res) => {
  const { content, customerId } = req.body;
  try {
    const newNote = await prisma.note.create({
      data: {
        content,
        customer: { connect: { id: customerId } },
        user: { connect: { id: req.user.userId } },
      },
    });
    res.status(201).json(newNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating note.' });
  }
};

const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.note.delete({
      where: { id },
    });
    res.json({ message: 'Note deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting note.' });
  }
};

moddule.exports = {
  getNotes,
  createNote,
  deleteNote,
}