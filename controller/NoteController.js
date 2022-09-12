const Note = require("../models/Note");
const User = require("../models/User");

const getNotes = async (req, res) => {
  try {
    const id = req.userId;
    if (await User.count({ _id: id })) {
      const notes = await User.findById(id).populate("notes");
      res.status(200).json(notes);
    } else {
      return res.status(404).json({ message: "Not Found !!" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const addNote = async (req, res) => {
  const { title, description } = req.body;
  try {
    const id = req.userId;
    if (await User.count({ _id: id })) {
      const newNote = await Note.create({ title, description });
      await User.findByIdAndUpdate(id, { $push: { notes: newNote._id } });
      return res.status(200).json({ message: "Note Created" });
    } else {
      return res.status(404).json({ message: "Not Found !!" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const editNote = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  try {
    if (await Note.count({ _id: id })) {
      await Note.findByIdAndUpdate(id, { title, description });
      res.status(200).json({ message: "Note Modified" });
    } else {
      return res.status(404).json({ message: "Not Found !!" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const deleteNote = async (req, res) => {
  const id = req.params.id;
  const userid = req.userId;
  try {
    if (await Note.count({ _id: id })) {
      const note = await Note.findByIdAndDelete(id);
      await User.findByIdAndUpdate(userid, { $pull: { notes: note._id } });
      return res.status(200).json({ message: "Note Deleted" });
    } else {
      return res.status(404).json({ message: "Not Found !!" });
    }
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = { addNote, getNotes, editNote, deleteNote };
