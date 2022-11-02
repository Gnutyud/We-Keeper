import Modal from '../UI/Modal';
import AppContext from '../../store/context';
import { useContext, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import NoteItem from '../MainContent/NoteItem';
import NoteBox from '../MainContent/NoteBox';
import { useNavigate } from 'react-router-dom';

const ViewingNote = () => {
  // Update or Edit notes
  const {
    fetchNotes,
    auth,
    ViewingMode,
    setSearchInput,
    turnOffSearchingMode,
    turnOffViewingMode,
    setViewingMode,
    selectedNote,
  } = useContext(AppContext);
//   const [id, setId] = useState(null);
//   const [text, setText] = useState('');
//   const [title, setTitle] = useState('');
//   const [color, setColor] = useState('');
  const [updateNote, setUpdateNote] = useState(selectedNote);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const updatedNote = async () => {
    // const body = {
    //   id: id,
    //   title: title,
    //   text: text,
    //   color: color,
    //   userId: auth?.userId,
    // };
    await axiosPrivate.patch('/notes', updateNote);
    const response = await axiosPrivate.get(`/notes/${auth?.userId}`);
    fetchNotes(response);
  };

  const deleteNote = async (id) => {
    try {
      await axiosPrivate.delete(`/notes/${id}`);
      const response = await axiosPrivate.get(`/notes/${auth?.userId}`);
      fetchNotes(response);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitUpdate = () => {
    updatedNote();
    // setId(null);
    // setTitle('');
    // setText('');
    turnOffViewingMode();
  };

  const onCloseSearchTab = () => {
    setSearchInput('');
    turnOffSearchingMode();
  };

  const handleClick = () => {
    onCloseSearchTab();
    setViewingMode("edit");
  };
  const cancelEdit = () => {
    turnOffViewingMode();
  };

  if (ViewingMode === "edit")
    return (
      <Modal onClick={cancelEdit}>
        <NoteBox
          display={true}
          onSubmit={onSubmitUpdate}
          text={updateNote.text}
          setText={(updateText) => setUpdateNote((prev) => ({ ...prev, text: updateText }))}
          title={updateNote.title}
          setTitle={(updateTitle) => setUpdateNote((prev) => ({ ...prev, title: updateTitle }))}
          color={updateNote.color}
          setColor={(updateColor) => setUpdateNote((prev) => ({ ...prev, color: updateColor }))}
          cName={'add-content edit-form'}
          submitName={'Update'}
          onCancel={cancelEdit}
        />
      </Modal>
    );

  if (!ViewingMode) {
    navigate('/notes');
  }

  return (
    <Modal onClick={() => turnOffViewingMode()}>
      <NoteItem
        color={selectedNote.color}
        key={selectedNote.id}
        text={selectedNote.text}
        title={selectedNote.title}
        createdAt={selectedNote.createdAt}
        updatedAt={selectedNote.updatedAt}
        isViewing={ViewingMode === "view"}
        onClose={() => turnOffViewingMode()}
        handleClick={() => handleClick()}
        removeNoteItem={() => deleteNote(selectedNote._id)}
      />
    </Modal>
  );
};

export default ViewingNote;
