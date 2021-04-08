import Add from './components/Add';
import Header from './components/Header';
import Notes from './components/Notes';
import React, { useState, useEffect } from 'react';

function App() {
  const [ourNotes, setNote] = useState([]);
  // Call api
  useEffect(() => {
    const getNotes = async () => {
      const noteFromServer = await fetchNotes();
      setNote(noteFromServer);
    };
    getNotes();
  }, []);
  // fetch Notes data from server
  const fetchNotes = async () => {
    const res = await fetch(
      'https://my-json-server.typicode.com/gnutyud/we-keeper/ourNotes',
    );
    const data = await res.json();
    return data;
  };
  // Delete func
  const delNote = async (id) => {
    await fetch(
      `https://my-json-server.typicode.com/gnutyud/we-keeper/ourNotes/${id}`,
      { method: 'DELETE' },
    );
    setNote(ourNotes.filter((note) => note.id !== id));
  };
  // Set value to expansion Add note form
  const [showAddNote, setshowAddNote] = useState(false);
  // Save notes value from input
  const saveNote = async (note) => {
    const res = await fetch(
      'https://my-json-server.typicode.com/gnutyud/we-keeper/ourNotes',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
      },
    );
    const data = await res.json();
    setNote([data, ...ourNotes]);
    // const id = Math.floor(Math.random() * 1000) + 1;
    // const newNote = { id, ...note };
    // setNote([newNote, ...ourNotes]);
  };
  // Edit func
  const editNote = async (updateNote) => {
    const res = await fetch(
      `https://my-json-server.typicode.com/gnutyud/we-keeper/ourNotes/${updateNote.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: updateNote.title,
          text: updateNote.text,
        }),
      },
    );
    const data = await res.json();
    console.log(data);
    setNote(ourNotes.map((note) => (note.id === updateNote.id ? data : note)));
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
