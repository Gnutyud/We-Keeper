import { useState } from 'react';
import NoteForm from './NoteForm';

const Add = ({
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
  const onSubmit = (e) => {
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
  // take the text value to pass the set row number func for textarea input form
  textareaLine(text);
  return (
    <NoteForm
      openAdd={openAdd}
      display={display}
      onSubmit={onSubmit}
      text={text}
      setText={setText}
      title={title}
      setTitle={setTitle}
      color={color}
      setColor={setColor}
      cName={'add-content'}
      submitName={'Close'}
      numLine={numLine}
    />
  );
};

export default Add;
