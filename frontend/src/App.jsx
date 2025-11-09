import React, { useState, useEffect } from "react";
import { fetchNotes, createNote, updateNote, deleteNote } from "./api/notesApi";

function App() {
  const [notes, setNotes] = useState([]);
  const [inputTitle, setInputTitle] = useState("");
  const [inputText, setInputText] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchNotes()
      .then((data) => setNotes(data))
      .catch(console.error);
  }, []);

  const handleAddOrUpdate = () => {
    if (!inputTitle.trim() || !inputText.trim()) return;

    const noteData = { title: inputTitle, text: inputText };

    if (editIndex !== null) {
      updateNote(notes[editIndex].id, noteData.title, noteData.text)
        .then((updatedNote) => {
          const updatedNotes = [...notes];
          updatedNotes[editIndex] = updatedNote;
          setNotes(updatedNotes);
          setEditIndex(null);
          setInputTitle("");
          setInputText("");
        })
        .catch(console.error);
    } else {
      createNote(noteData.title, noteData.text)
        .then((newNote) => {
          setNotes([...notes, newNote]);
          setInputTitle("");
          setInputText("");
        })
        .catch(console.error);
    }
  };

  const handleEdit = (index) => {
    setInputTitle(notes[index].title);
    setInputText(notes[index].text);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    deleteNote(notes[index].id)
      .then(() => {
        setNotes(notes.filter((_, i) => i !== index));
        if (editIndex === index) {
          setInputTitle("");
          setInputText("");
          setEditIndex(null);
        }
      })
      .catch(console.error);
  };

// Inside component function, before return
const filteredNotes = notes.filter(note =>
  note.title.toLowerCase().includes(searchQuery.toLowerCase())
);

return (
  <div className="min-h-screen bg-black p-6 flex flex-col items-center text-yellow-400">
    <h1 className="text-3xl font-bold mb-6">Note App</h1>
    <div className="w-full max-w-md bg-gray-900 p-4 rounded shadow-lg">

      {/* Search Input */}
      <input
        type="text"
        className="border border-yellow-400 rounded w-full p-2 mb-4 bg-black text-yellow-400 placeholder-yellow-600"
        placeholder="Search by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Note Title Input */}
      <input
        type="text"
        className="border border-yellow-400 rounded w-full p-2 mb-2 bg-black text-yellow-400 placeholder-yellow-600"
        placeholder="Note Title"
        value={inputTitle}
        onChange={(e) => setInputTitle(e.target.value)}
      />
      {/* Note Text Input */}
      <textarea
        className="border border-yellow-400 rounded w-full p-2 mb-4 bg-black text-yellow-400 placeholder-yellow-600"
        placeholder="Note Text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        rows={3}
      />
      <button
        onClick={handleAddOrUpdate}
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded w-full"
      >
        {editIndex !== null ? "Update Note" : "Add Note"}
      </button>
      <ul className="mt-4">
        {filteredNotes.map((note, index) => (
          <li
            key={note.id}
            className="flex flex-col bg-gray-900 rounded p-3 mb-3 border border-yellow-400"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold">{note.title}</span>
              <div>
                <button
                  onClick={() => handleEdit(notes.indexOf(note))}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-1 px-3 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(notes.indexOf(note))}
                  className="bg-red-600 hover:bg-red-700 text-yellow-400 font-bold py-1 px-3 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
            <p>{note.text}</p>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
}
export default App;
