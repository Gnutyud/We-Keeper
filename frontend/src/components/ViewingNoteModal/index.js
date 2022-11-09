import Modal from '../UI/Modal';
import AppContext from '../../store/context';
import { useContext, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import NoteItem from '../MyNotesContent/NoteItem';
import NoteBox from '../MyNotesContent/NoteBox';
import { useNavigate } from 'react-router-dom';

const ViewingNoteModal = () => {
  // Update or Edit notes
  const {
    fetchNotes,
    auth,
    viewingMode,
    setSearchInput,
    turnOffSearchingMode,
    turnOffViewingMode,
    setViewingMode,
    selectedNote,
  } = useContext(AppContext);
  const [updateNote, setUpdateNote] = useState(selectedNote);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const updatedNote = async () => {
    await axiosPrivate.patch('/notes', {...updateNote, id: updateNote._id});
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

  if (viewingMode === "edit")
    return (
      <Modal onClick={() => turnOffViewingMode()}>
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
          onCancel={() => setViewingMode("view")}
        />
      </Modal>
    );

  if (!viewingMode) {
    navigate('/');
  }

  return (
    <Modal onClick={() => turnOffViewingMode()}>
      <NoteItem
        key={selectedNote.id}
        data={selectedNote}
        onClose={() => turnOffViewingMode()}
        handleEdit={() => handleClick()}
        removeNoteItem={() => {
            deleteNote(selectedNote._id);
            turnOffViewingMode();
        }}
      />
    </Modal>
  );
};

export default ViewingNoteModal;
