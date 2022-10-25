import React, { useContext, useEffect } from "react";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import AppContext from "./store/context";
import useAxiosPrivate from "./hooks/useAxiosPrivate";

function App() {

  const { fetchNotes, auth } = useContext(AppContext);
  const axiosPrivate = useAxiosPrivate();
  // get notes
  useEffect(() => {

    const getNotes = async () => {
      try {
        const response = await axiosPrivate.get(`/notes/${auth?.userId}`);
        fetchNotes(response);
      } catch (error) {
        console.error(error)
      }
    }
    getNotes();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Header />
      <MainContent />
    </div>
  );
}

export default App;
