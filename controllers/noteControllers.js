import Note from "../models/noteModel.js";
import User from "../models/userModel.js";

export const createNote = async (req, res) => {
  try {
    const { title, body, tag, color, userId } = req.body;

    if (!userId) {
      console.log("userid param not sent with request");
      res.status.send(400);
    }

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
export const updateNoteTitle = async (req, res) => {
  try {
    const { title, noteId } = req.body;

    if (!title || !noteId) {
      res.status(400).json({ message: "filed are emptys" });
    }

    const newTitle = await Note.findByIdAndUpdate(
      noteId,
      { title: title },
      { new: true }
    );
    if (!newTitle) {
      res.status(400).send("newtitle creating problem");
    } else {
      res.json(newTitle);
    }
  } catch (error) {
    res.status(400).json({ message: "updateNoteTitle error" });
  }
};
export const updateNoteBody = async (req, res) => {
  try {
    const { body, noteId } = req.body;

    if (!body || !noteId) {
      res.status(400).json({ message: "field is empty" });
    }

    const newBody = await Note.findByIdAndUpdate(
      noteId,
      { body: body },
      { new: true }
    );
    if (!newBody) {
      res.status(400).json({ message: "body is not updated" });
    } else {
      res.status(200).json(newBody);
    }
  } catch (error) {
    res.status(400).json({ message: " updateNotebody problem" });
  }
};
export const updateNoteTag = async (req, res) => {
  try {
    const { tag, noteId } = req.body;

    if (!tag || !noteId) {
      res.status(400).json({ message: "field is empty" });
    }

    const newTag = await Note.findByIdAndUpdate(
      noteId,
      { tag: tag },
      { new: true }
    );
    if (!newTag) {
      res.status(400).json({ message: "Tag is not updated" });
    } else {
      res.status(200).json(newTag);
    }
  } catch (error) {
    res.status(400).json({ message: " update tag problem" });
  }
};
export const updateNoteColor = async (req, res) => {
  try {
    const { color, noteId } = req.body;

    if (!color || !noteId) {
      res.status(400).json({ message: "field is empty" });
    }

    const newColor = await Note.findByIdAndUpdate(
      noteId,
      { color: color },
      { new: true }
    );
    if (!newColor) {
      res.status(400).json({ message: "color is not updated" });
    } else {
      res.status(200).json(newColor);
    }
  } catch (error) {
    res.status(400).json({ message: " color api problem" });
  }
};
export const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const deleteNote = await Note.findByIdAndDelete(noteId);
    if (!deleteNote) {
      res.status(400).json({ message: "note not deleted" });
    }
    res.status(200).json({ message: " successfully deleted" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
