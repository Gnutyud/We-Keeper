import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import MyNotesContent from '../components/MyNotesContent';
import AppContext from '../store/context';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

function MyNotes() {
  const { setNoteList, auth, setProfile } = useContext(AppContext);
  const axiosPrivate = useAxiosPrivate();
  // get notes
  useEffect(() => {
    const getNotesAndProfile = async () => {
      if (auth?.userInfo?.userId) {
        try {
          const userId = auth?.userInfo?.userId;
          const notes = await axiosPrivate.get(`/notes/${userId}`);
          const profile = await axiosPrivate.get(`/users/${userId}`);
          const [responseAuth, responseProfile] = await Promise.all([notes, profile]);
          const { username, email, roles, status, avatar, createdAt, source } = responseProfile.data;
          setNoteList(responseAuth);
          setProfile({
            username,
            email,
            roles,
            status,
            avatar,
            source,
            joinDate: createdAt,
            totalNotes: responseProfile.totalNotes,
          });
        } catch (error) {
          console.error(error);
        }
      }
    };
    getNotesAndProfile();
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
