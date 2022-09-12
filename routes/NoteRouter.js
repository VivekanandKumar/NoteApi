const noteRoutes = require("express").Router();
const { addNote, getNotes, editNote, deleteNote } = require("../controller/NoteController");
const { auth } = require("../middlewares/auth");

noteRoutes.post("/add", auth, addNote);
noteRoutes.get("/notes", auth, getNotes);
noteRoutes.put("/edit/:id", auth, editNote);
noteRoutes.delete("/delete/:id", auth, deleteNote);

module.exports = { noteRoutes };
