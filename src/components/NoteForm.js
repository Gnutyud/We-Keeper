const NoteForm = ({
  title,
  setTitle,
  text,
  setText,
  display,
  openAdd,
  onSubmit,
  cName,
  submitName,
  numLine,
}) => {
  return (
    <form className={cName} onSubmit={onSubmit}>
      {display && (
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      )}
      <textarea
        id="text-area"
        rows={numLine}
        type="text"
        placeholder="Take a note here..."
        className="text-input"
        onClick={openAdd}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {display && (
        <button type="submit" className="btn-close">
          {submitName}
        </button>
      )}
    </form>
  );
};

export default NoteForm;
