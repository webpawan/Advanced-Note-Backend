import Note from "../models/noteModel.js";
export const createNote = async (req, res) => {
  try {
    const { title, body, tag, color } = req.body;

    const newNote = await Note({
      title: title,
      body: body,
      tag: tag,
      color: color,
      auther: req.user._id,
    });

    await newNote.save();
    res.status(200).send(newNote);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "create not problem" });
  }
};
export const selectNote = async (req, res) => {
  const { noteId } = req.params;
  if (!noteId) {
    res.status(400).json({ message: "note id not selected" });
  }
  try {
    const note = await Note.findById(noteId);
    res.status(200).json(note);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "server error" });
  }
};
export const fetchNote = async (req, res) => {
  try {
    const userId = req.user._id;

    // const allNotes = await Note.find({ auther: userId }).populate("auther");
    // yadi use ke detail bhi leni ho to but password ko nahi dikhna to auther ke badu ma -property ka do no jo property nahi dekhi ha
    const allNotes = await Note.find({ auther: userId });
    res.status(200).json(allNotes);
  } catch (error) {
    res.status(400).json({ message: "fetch not problem" });
  }
};
export const updateNote = async (req, res) => {
  try {
    const { title, body, color, tag, noteId } = req.body;

    const newTitle = await Note.findByIdAndUpdate(
      noteId,
      { title, body, color, tag },
      { new: true }
    );
    if (!newTitle) {
      res.status(200).send("user did not change any value");
    } else {
      res.json(newTitle);
    }
  } catch (error) {
    res.status(400).json({ message: "updateNoteTitle error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const deleteNote = await Note.findByIdAndDelete(noteId);
    if (!deleteNote) {
      return res.status(400).json({ message: "note not deleted" });
    }
    return res.status(200).json({ message: " successfully deleted" });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
