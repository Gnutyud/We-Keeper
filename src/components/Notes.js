import React, { useState } from 'react';
import NoteForm from './NoteForm';
import parse from 'html-react-parser';

const Notes = ({
  notes,
  onDelete,
  editNote,
  isSearch,
  searchData,
  searchClose,
  numLine,
  textareaLine,
  searchText,
}) => {
  // Update or Edit notes
  const [id, setId] = useState(null);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('');
  const submitUpdate = () => {
    editNote({ id, title, text, color });
    setId(null);
    setTitle('');
    setText('');
  };

  // when click on search input
  if (isSearch) {
    if (searchData.length < 1) {
      return (
        <div className='not-found'>
          <h3>No matches found !</h3>
          <img src='https://img.icons8.com/ios/452/sad.png' alt='sad' />
        </div>
      );
    }
    return (
      <div className='note-content'>
        {searchData.map(function (search) {
          let str = new RegExp(searchText, 'gmi');
          let highlightTitle = search.title.replace(
            str,
            `<b>${searchText}</b>`,
          );
          let highlightText = search.text.replace(str, `<b>${searchText}</b>`);
          return (
            <div
              key={search.id}
              className='note-box'
              style={{ backgroundColor: search.color }}>
              <i
                className='fa fa-pencil'
                aria-hidden='true'
                onClick={() => {
                  setId(search.id);
                  setTitle(search.title);
                  setText(search.text);
                  setColor(search.color);
                  searchClose();
                }}></i>
              <i
                className='fa fa-trash-o'
                aria-hidden='true'
                onClick={() => onDelete(search.id)}></i>
              <h3>{parse(highlightTitle)}</h3>
              <p>{parse(highlightText)}</p>
            </div>
          );
        })}
      </div>
    );
  }
  // When click on edit icon => render edit modal
  if (id) {
    //  take the text value to pass the set row number func for textarea input form
    textareaLine(text);

    return (
      <div id='myModal' className='modal'>
        {
          <NoteForm
            display={true}
            onSubmit={submitUpdate}
            text={text}
            setText={setText}
            title={title}
            setTitle={setTitle}
            color={color}
            setColor={setColor}
            cName={'add-content edit-form'}
            submitName={'Update'}
            numLine={numLine}
          />
        }
      </div>
    );
  }
  // Render note items
  return (
    <div className='note-content'>
      {notes.map((note) => (
        <div
          key={note.id}
          className='note-box'
          style={{ backgroundColor: note.color }}>
          <i
            className='fa fa-pencil'
            aria-hidden='true'
            onClick={() => {
              setId(note.id);
              setTitle(note.title);
              setText(note.text);
              setColor(note.color);
            }}></i>
          <i
            className='fa fa-trash-o'
            aria-hidden='true'
            onClick={() => onDelete(note.id)}></i>
          <h3>{(note.title = '' ? 'No title' : note.title)}</h3>
          <p>{note.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Notes;
