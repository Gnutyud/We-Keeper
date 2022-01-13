import { useState } from 'react';
import NoteBox from './NoteBox';

const AddNote = ({
  openAdd,
  closeAdd,
  display,
  onSave,
  numLine,
  setNumLine,
  textareaLine,
}) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [color, setColor] = useState('');
  // when click Close button
  const onSubmitAdd = (e) => {
    e.preventDefault();
    setNumLine('1');
    if (!text && !title) {
      setColor('#ffffff');
      closeAdd();
      return;
    }
    onSave({ title, text, color });
    setTitle('');
    setText('');
    // set white color to default
    setColor('#ffffff');
    closeAdd();
  };

  const cancelAdd = () => {
    setTitle('');
    setText('');
    setColor('#ffffff');
    closeAdd();
  }
  // take the text value to pass the set row number func for textarea input form
  textareaLine(text);
  return (
    <NoteBox
      openAdd={openAdd}
      display={display}
      onSubmit={onSubmitAdd}
      text={text}
      setText={setText}
      title={title}
      setTitle={setTitle}
      color={color}
      setColor={setColor}
      cName={'add-content'}
      submitName={'Add'}
      numLine={numLine}
      onCancel={cancelAdd}
    />
  );
};

export default AddNote;
