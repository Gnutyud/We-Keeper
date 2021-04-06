import Add from "./components/Add";
import Header from "./components/Header";
import Notes from "./components/Notes";
import React, { useState } from "react";

function App() {
  const [ourNotes, setNote] = useState([
    {
      id: 1,
      title: "",
      text: "Study",
      day: "March 30, 2021",
      reminder: false,
    },
    {
      id: 2,
      title: "Exercise",
      text: "running 30m everyday",
      day: "",
      reminder: true,
    },
    {
      id: 3,
      title: "Web dev",
      text: "Get a job",
      day: "someday in May 2021",
      reminder: true,
    },
  ]);
  // Delete func
  const delNote = (id) => {
    setNote(ourNotes.filter((note) => note.id !== id));
  };
  // Set value to expansion Add note form
  const [showAddNote, setshowAddNote] = useState(false);
  // Save notes value from input
  const saveNote = (note) => {
    const id = Math.floor(Math.random() * 1000) + 1;
    const newNote = { id, ...note };
    setNote([newNote, ...ourNotes]);
  };
  // Edit func
  const editNote = (updateId, updateTitle, updateText) => {
    setNote(
      ourNotes.map((note) =>
        note.id === updateId
          ? { id: updateId, title: updateTitle, text: updateText }
          : note,
      ),
    );
  };

  return (
    <div>
      <Header />
      <Add
        display={showAddNote}
        openAdd={() => setshowAddNote(true)}
        closeAdd={() => setshowAddNote(false)}
        onSave={saveNote}
      />
      <Notes notes={ourNotes} onDelete={delNote} editNote={editNote} />
    </div>
  );
}

export default App;
