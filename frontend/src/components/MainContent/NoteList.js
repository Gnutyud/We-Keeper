import parse from 'html-react-parser';
import React, { useContext, useState } from 'react';
import AppContext from '../../store/context';
import NoteBox from './NoteBox';
import NoteItem from './NoteItem';
import Modal from '../UI/Modal';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const NoteList = () => {
  // Update or Edit notes
  const { fetchNotes, auth, noteData, isSearching, searchNoteResult, searchInput, setSearchInput, turnOffSearchingMode, isViewing, viewingNote, turnOnViewingMode, turnOffViewingMode } = useContext(AppContext);
  const [id, setId] = useState(null);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('');
  const axiosPrivate = useAxiosPrivate();

  const updatedNote = async () => {
    const body = {
      id: id,
      title: title,
      text: text,
      color: color,
      userId: auth?.userId
    }
    await axiosPrivate.patch('/notes', body);
    const response = await axiosPrivate.get(`/notes/${auth?.userId}`);
    fetchNotes(response);
  }

  const deleteNote = async (id) => {
    try {
      await axiosPrivate.delete(`/notes/${id}`);
      const response = await axiosPrivate.get(`/notes/${auth?.userId}`);
      fetchNotes(response);
    } catch (error) {
      console.log(error);
    }
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
    setId(note._id);
    setTitle(note.title);
    setText(note.text);
    setColor(note.color);
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
              removeNoteItem={() => deleteNote(search._id)}
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
          onCancel={cancelEdit}
        />
      </Modal>
    );
  }
  // When click on the note item then open view mode
  if (isViewing && viewingNote) {
    return (
      <Modal onClick={() => turnOffViewingMode()}>
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
          removeNoteItem={() => deleteNote(viewingNote._id)}
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
          removeNoteItem={() => deleteNote(note._id)}
          onClick={() => turnOnViewingMode(note)} />
      ))}
    </div>
  );
};

export default NoteList;
