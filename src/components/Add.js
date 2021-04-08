import { useState } from 'react';
import NoteForm from './NoteForm';

const Add = ({ openAdd, closeAdd, display, onSave }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  // set number of row in textarea to fit with content input
  const [numLine, setNumLine] = useState('1');
  let textarea = document.getElementById('text-area');
  if (textarea) {
    textarea.addEventListener('keyup', () => {
      var num = textarea.value.split('\n');
      setNumLine(num.length);
    });
  }
  // when click Close button
  const onSubmit = (e) => {
    e.preventDefault();
    setNumLine('1');
    if (!text && !title) {
      closeAdd();
      return;
    }
    onSave({ title, text });
    setTitle('');
    setText('');
    closeAdd();
  };

  return (
    <NoteForm
      openAdd={openAdd}
      display={display}
      onSubmit={onSubmit}
      text={text}
      setText={setText}
      title={title}
      setTitle={setTitle}
      cName={'add-content'}
      submitName={'Close'}
      numLine={numLine}
    />
  );
};

export default Add;
