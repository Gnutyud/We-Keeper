import React from 'react';
import AppContext from '../../store/context';
import AddNote from './AddNote';
import NoteList from './NoteList';

const MyNotesContent = () => {
  const { isSearching } = React.useContext(AppContext);

  return <React.Fragment>
    {!isSearching && <AddNote />}
    <NoteList />
  </React.Fragment>
};

export default MyNotesContent;