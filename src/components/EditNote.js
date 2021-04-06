import NoteForm from "./NoteForm";
const EditNote = ({ onSubmit, text, setText, title, setTitle }) => {
  // set number of row in textarea to fit with content input

  return (
    <NoteForm
      display={true}
      onSubmit={onSubmit}
      text={text}
      setText={setText}
      title={title}
      setTitle={setTitle}
      cName={"add-content edit-form"}
      submitName={"Update"}
    />
  );
};

export default EditNote;
