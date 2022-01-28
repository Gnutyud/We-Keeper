import parse from 'html-react-parser';
import React, { useContext, useState } from 'react';
import appApi from '../../services/appApi';
import AppContext from '../../store/context';
import NoteBox from './NoteBox';
import NoteItem from './NoteItem';
import Modal from '../UI/Modal';

const NoteList = () => {
  // Update or Edit notes
  const { noteData, removeNoteItem, addNoteItem, isSearching, searchNoteResult, searchInput, setSearchInput, turnOffSearchingMode, isViewing, viewingNote, turnOnViewingMode, turnOffViewingMode } = useContext(AppContext);
  const [id, setId] = useState(null);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');

  const updatedNote = async () => {
    const d = new Date();
    const updatedAt = d.toISOString();
    const body = {
      id: id,
      title: title,
      text: text,
      color: color,
      createdAt: createdAt,
      updatedAt: updatedAt,
    }
    const data = await appApi.updateNote(id, body);
    addNoteItem(data);
  }

  const onSubmitUpdate = () => {
    updatedNote();
    setId(null);
    setTitle('');
    setText('');
    turnOffViewingMode();
  };

  const onCloseSearchTab = () => {
    setSearchInput("");
    turnOffSearchingMode();
  };

  const handleClick = (note) => {
    setId(note.id);
    setTitle(note.title);
    setText(note.text);
    setColor(note.color);
    setCreatedAt(note.createdAt);
    setUpdatedAt(note.updatedAt);
    onCloseSearchTab();
    turnOffViewingMode();
  }
  const cancelEdit = () => {
    setId(null);
    turnOffViewingMode();
  }

  // when click on search input
  if (isSearching) {
    if (searchNoteResult.length === 0) {
      return (
        <div className='not-found'>
          <h3>No matches found !</h3>
          <img src='https://img.icons8.com/ios/452/sad.png' alt='sad' />
        </div>
      );
    }
    return (
      <div className='note-content'>
        {searchNoteResult.map(function (search) {
          let str = new RegExp(searchInput, 'gmi');
          let highlightTitle = search.title.replace(
            str,
            `<b>${searchInput}</b>`,
          );
          let highlightText = search.text.replace(str, `<mark>${searchInput}</mark>`);
          return (
            <NoteItem
              color={search.color}
              key={search.id}
              text={searchInput ? parse(highlightText) : search.text}
              title={searchInput ? parse(highlightTitle) : search.title}
              isViewing={isViewing}
              handleClick={() => handleClick(search)}
              removeNoteItem={() => removeNoteItem(search.id)}
              onClick={() => turnOnViewingMode(search)} />
          );
        })}
      </div>
    );
  }
  // When click on edit icon => render edit modal
  if (id) {
    //  take the text value to pass the set row number func for textarea input form
    return (
      <Modal onClick={cancelEdit}>
        <NoteBox
            display={true}
            onSubmit={onSubmitUpdate}
            text={text}
            setText={setText}
            title={title}
            setTitle={setTitle}
            color={color}
            setColor={setColor}
            cName={'add-content edit-form'}
            submitName={'Update'}
            createdAt={createdAt}
            updatedAt={updatedAt}
            onCancel={cancelEdit}
          />
      </Modal>
    );
  }
  // When click on the note item then open view mode
  if (isViewing && viewingNote) {
    return (
      <Modal onClick={()=>turnOffViewingMode()}>
      <NoteItem
            color={viewingNote.color}
            key={viewingNote.id}
            text={viewingNote.text}
            title={viewingNote.title}
            createdAt={viewingNote.createdAt}
            updatedAt={viewingNote.updatedAt}
            isViewing={isViewing}
            onClose={() => turnOffViewingMode()}
            handleClick={() => handleClick(viewingNote)}
            removeNoteItem={() => removeNoteItem(viewingNote.id)}
          />
    </Modal>
    );
  }
  // Render note items
  return (
    <div className='note-content'>
      {noteData.map((note) => (
        <NoteItem
          color={note.color}
          key={note.id}
          text={note.text}
          title={note.title}
          isViewing={isViewing}
          handleClick={() => handleClick(note)}
          removeNoteItem={() => removeNoteItem(note.id)}
          onClick={() => turnOnViewingMode(note)} />
      ))}
    </div>
  );
};

export default NoteList;
