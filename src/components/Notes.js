import React, { useState } from 'react';
import EditNote from './EditNote';

const Notes = ({ notes, onDelete, editNote }) => {
  const [id, setId] = useState(null);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const submitUpdate = () => {
    editNote({ id, title, text });
    setId(null);
    setTitle('');
    setText('');
  };
  if (id) {
    return (
      <div id='myModal' className='modal'>
        <EditNote
          onSubmit={submitUpdate}
          text={text}
          title={title}
          setText={setText}
          setTitle={setTitle}
        />
      </div>
    );
  }

  return (
    <div className='note-content'>
      {notes.map((note) => (
        <div key={note.id} className='note-box'>
          <i
            className='fa fa-pencil'
            aria-hidden='true'
            onClick={() => {
              setId(note.id);
              setTitle(note.title);
              setText(note.text);
            }}></i>
          <i
            className='fa fa-trash-o'
            aria-hidden='true'
            onClick={() => onDelete(note.id)}></i>
          <i class='fa fa-paint-brush'></i>
          <h3>{(note.title = '' ? 'No title' : note.title)}</h3>
          <p>{note.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Notes;
