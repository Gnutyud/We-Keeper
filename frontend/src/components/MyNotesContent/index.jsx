import React from 'react';
import AppContext from '../../store/context';
import AddNote from './AddNote';
import NoteList from './NoteList';

function MyNotesContent() {
  const { isSearching } = React.useContext(AppContext);

  return (
    <>
      {!isSearching && <AddNote />}
      <NoteList />
    </>
  );
}

export default MyNotesContent;
