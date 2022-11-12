import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import MyNotesContent from '../components/MyNotesContent';
import AppContext from '../store/context';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

function MyNotes() {
  const { setNoteList, auth } = useContext(AppContext);
  const axiosPrivate = useAxiosPrivate();
  // get notes
  useEffect(() => {
    const getNotes = async () => {
      if(auth?.userInfo?.userId) {
        try {
          const response = await axiosPrivate.get(`/notes/${auth?.userInfo?.userId}`);
          setNoteList(response);
        } catch (error) {
          console.error(error);
        }
      }
    };
    getNotes();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Header />
      <MyNotesContent />
    </div>
  );
}

export default MyNotes;
