const express = require('express');
const router = express.Router();

const { getNotes, createNote, deleteNote } = require('../controllers/notesController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect);

router.get('/', getNotes); // Get all notes for authenticated user
router.post('/', createNote); // Create a new note  
router.delete('/:id', deleteNote); // Delete a note by ID

module.exports = router;