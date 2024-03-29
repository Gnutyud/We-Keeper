import parse from 'html-react-parser';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import AppContext from '../../store/context';
import NoteItem from './NoteItem';

function NoteList() {
  // Update or Edit notes
  const {
    setNoteList,
    auth,
    noteData,
    isSearching,
    searchNoteResult,
    searchInput,
    setSearchInput,
    turnOffSearchingMode,
    setViewingMode,
    setSelectedNote,
  } = useContext(AppContext);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const deleteNote = async (id) => {
    try {
      await axiosPrivate.delete(`/notes/${id}`);
      const response = await axiosPrivate.get(`/notes/${auth?.userInfo?.userId}`);
      setNoteList(response);
    } catch (error) {
      console.log(error);
    }
  };

  const onCloseSearchTab = () => {
    setSearchInput('');
    turnOffSearchingMode();
  };

  const handleClick = (note) => {
    setSelectedNote(note);
    onCloseSearchTab();
    setViewingMode('edit');
    navigate(`/${note._id}`);
  };

  const handleOnClickNote = (note) => {
    setSelectedNote(note);
    navigate(`/${note._id}`);
  };

  // when click on search input
  if (isSearching) {
    if (searchNoteResult.length === 0) {
      return (
        <div className="not-found">
          <h3>No matches found !</h3>
          <img src="https://img.icons8.com/ios/452/sad.png" alt="sad" />
        </div>
      );
    }
    return (
      <div className="note-content">
        {searchNoteResult.map((search) => {
          const str = new RegExp(searchInput, 'gmi');
          const highlightTitle = search.title.replace(str, `<b>${searchInput}</b>`);
          const highlightText = search.text.replace(str, `<mark>${searchInput}</mark>`);
          const data = {
            ...search,
            text: searchInput ? parse(highlightText) : search.text,
            title: searchInput ? parse(highlightTitle) : search.title,
          };
          return (
            <NoteItem
              key={data._id}
              data={data}
              handleEdit={() => handleClick(search)}
              removeNoteItem={() => deleteNote(search._id)}
              onClick={() => handleOnClickNote(search)}
            />
          );
        })}
      </div>
    );
  }
  // Render note items
  return (
    <div className="note-content">
      {noteData.map((note) => (
        <NoteItem
          key={note._id}
          data={note}
          handleEdit={() => handleClick(note)}
          removeNoteItem={() => deleteNote(note._id)}
          onClick={() => handleOnClickNote(note)}
        />
      ))}
    </div>
  );
}

export default NoteList;
