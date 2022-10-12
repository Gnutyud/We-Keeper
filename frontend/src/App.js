import React, { useContext, useEffect } from "react";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import appApi from "./services/appApi";
import AppContext from "./store/context";

function App() {

  const { fetchNotes } = useContext(AppContext);
  // get notes
  useEffect(() => {
    const getNotes = async () => {
      const noteFromServer = await appApi.getNotes();
      const noteData = [];
      for (const key in noteFromServer) {
        if (noteFromServer[key])
          noteData.push({
            id: key,
            title: noteFromServer[key].title,
            text: noteFromServer[key].text,
            color: noteFromServer[key].color,
            createdAt: noteFromServer[key].createdAt || "",
            updatedAt: noteFromServer[key].updatedAt || "",
          });
      }
      fetchNotes(noteData);
    };
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
