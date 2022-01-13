import Add from "./components/Add";
import Header from "./components/Header";
import Notes from "./components/Notes";
import appApi from "./services/appApi";
import React, { useState, useEffect } from "react";

function App() {
  const [noteData, setNoteData] = useState([]);
  const [fetchData, setFetchData] = useState(false);
  // Call api
  useEffect(() => {
    const getNotes = async () => {
      // const noteFromServer = await fetchNotes();
      const noteFromServer = await appApi.getNotes();
      console.log(noteFromServer)
      const rewriteData = [];
      for (const key in noteFromServer) {
        if (noteFromServer[key])
          rewriteData.push({
            id: key,
            title: noteFromServer[key].title,
            text: noteFromServer[key].text,
            color: noteFromServer[key].color,
          });
      }
      setNoteData(rewriteData);
    };
    getNotes();
  }, [fetchData]);

  // Delete func
  const delNote = async (id) => {
    await appApi.deleteNote(id);
    setNoteData(noteData.filter((note) => note.id !== id));
  };
  // Save notes value from input
  const saveNote = async (note) => {
    try {
      await appApi.saveNote(note);
      setFetchData((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  };
  // Edit func
  const editNote = async (updateNote) => {
    const body = {
      title: updateNote.title,
      text: updateNote.text,
      color: updateNote.color,
    }
    const data = await appApi.updateNote(updateNote.id, body);
    setNoteData(
      noteData.map((note) => (note.id === updateNote.id ? data : note)),
    );
    setFetchData((prev) => !prev);
  };
  console.log(noteData);
  // Set value to expansion Add note form
  const [show, setShow] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  // Search handle
  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchData] = useState([]);
  const searchHandle = async (searchText) => {
    setIsSearch(true);
    // get matches to current text input search
    let matches = noteData.filter((state) => {
      const regex = new RegExp(`${searchText}`, "gmi");
      return state.title.match(regex) || state.text.match(regex);
    });
    if (searchText.length === 0) {
      matches = [];
    }
    setSearchData(matches);
  };
  // search close button
  const searchClose = () => {
    setSearchText("");
    setIsSearch(false);
    console.log("close search view");
  };
  // set number of row in textarea to fit with content input
  const [numLine, setNumLine] = useState("1");
  const textareaLine = (textValue) => {
    var textareaArr = textValue.split("\n");
    setNumLine(textareaArr.length);
  };
  return (
    <div>
      <Header
        onClick={searchHandle}
        isSearch={isSearch}
        searchClose={searchClose}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      {!isSearch && (
        <Add
          display={show}
          openAdd={() => setShow(true)}
          closeAdd={() => setShow(false)}
          onSave={saveNote}
          numLine={numLine}
          setNumLine={setNumLine}
          textareaLine={textareaLine}
        />
      )}
      <Notes
        notes={noteData}
        onDelete={delNote}
        editNote={editNote}
        isSearch={isSearch}
        searchData={searchData}
        searchClose={searchClose}
        numLine={numLine}
        textareaLine={textareaLine}
        searchText={searchText}
      />
    </div>
  );
}

export default App;
