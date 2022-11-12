import React, { useContext, useState } from 'react';
import AppContext from '../../store/context';
import NoteBox from './NoteBox';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

function AddNote() {
  const { setNoteList, auth } = useContext(AppContext);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [color, setColor] = useState('');
  const [show, setShow] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const addNote = async () => {
    const note = { title, text, color, userId: auth?.userInfo?.userId };

    try {
      await axiosPrivate.post('/notes', note);
      const response = await axiosPrivate.get(`/notes/${auth?.userInfo?.userId}`);
      setNoteList(response);
    } catch (err) {
      console.error(err);
    }
  };

  // when click Close button
  const onSubmitAdd = (e) => {
    e.preventDefault();
    // setNumLine('1');
    if (!text && !title) {
      setColor('#ffffff');
      setShow(false);
      return;
    }
    addNote();
    setTitle('');
    setText('');
    // set white color to default
    setColor('#ffffff');
    setShow(false);
  };

  const cancelAdd = () => {
    setTitle('');
    setText('');
    setColor('#ffffff');
    setShow(false);
  };
  // take the text value to pass the set row number func for textarea input form
  // textareaLine(text);
  return (
    <NoteBox
      openAdd={() => setShow(true)}
      display={show}
      onSubmit={onSubmitAdd}
      text={text}
      setText={setText}
      title={title}
      setTitle={setTitle}
      color={color}
      setColor={setColor}
      cName="add-content"
      submitName="Add"
      onCancel={cancelAdd}
    />
  );
}

export default AddNote;
