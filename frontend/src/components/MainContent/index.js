import React, { useEffect } from 'react';
import AddNote from './AddNote';
import NoteList from './NoteList';
import AppContext from '../../store/context';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useLocation, useNavigate } from 'react-router-dom';

const MainContent = () => {
  const {isSearching} = React.useContext(AppContext);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getAllNotes = async () => {
      try {
        await axiosPrivate.get('/notes');
      } catch (error) {
        console.error(error)
        navigate('/login', { state: { from: location}, replace: true})
      }
    }
    getAllNotes();
  })
  return <React.Fragment>
    {!isSearching && <AddNote/>}
    <NoteList/>
  </React.Fragment>
};

export default MainContent;