import React from 'react';
import AddNote from './AddNote';
import NoteList from './NoteList';
import AppContext from '../../store/context';

const MainContent = () => {
  const {isSearching} = React.useContext(AppContext);
  return <React.Fragment>
    {!isSearching && <AddNote/>}
    <NoteList/>
  </React.Fragment>
};

export default MainContent;