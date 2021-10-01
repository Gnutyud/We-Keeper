const NoteForm = ({
  title,
  setTitle,
  text,
  setText,
  color,
  setColor,
  display,
  openAdd,
  onSubmit,
  cName,
  submitName,
  numLine,
}) => {
  return (
    <form
      className={cName}
      onSubmit={onSubmit}
      style={{ backgroundColor: color }}>
      {display && (
        <input
          type='text'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ backgroundColor: color }}
        />
      )}
      <textarea
        rows={numLine}
        type='text'
        placeholder='Take a note here...'
        className='text-input'
        onClick={openAdd}
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ backgroundColor: color }}
      />

      {display && (
        <div className='note-form-footer'>
          <div className='color-box'>
            <i class='fa fa-paint-brush'></i>
            <div className='dropdown-color'>
              <div className='color-items'>
                <div
                  id='white'
                  style={{ backgroundColor: '#ffffff' }}
                  onClick={(e) => setColor(e.target.style.backgroundColor)}
                />
                <div
                  id='red'
                  style={{ backgroundColor: '#f28b82' }}
                  onClick={(e) => setColor(e.target.style.backgroundColor)}
                />
                <div
                  id='yellow'
                  style={{ backgroundColor: '#fbbc04' }}
                  onClick={(e) => setColor(e.target.style.backgroundColor)}
                />
                <div
                  id='light-yellow'
                  style={{ backgroundColor: '#fff475' }}
                  onClick={(e) => setColor(e.target.style.backgroundColor)}
                />
                <div
                  id='bright-yellow'
                  style={{ backgroundColor: '#ccff90' }}
                  onClick={(e) => setColor(e.target.style.backgroundColor)}
                />
                <div
                  id='blue'
                  style={{ backgroundColor: '#a7ffeb' }}
                  onClick={(e) => setColor(e.target.style.backgroundColor)}
                />
                <div
                  id='blue2'
                  style={{ backgroundColor: '#cbf0f8' }}
                  onClick={(e) => setColor(e.target.style.backgroundColor)}
                />
                <div
                  id='blue3'
                  style={{ backgroundColor: '#aecbfa' }}
                  onClick={(e) => setColor(e.target.style.backgroundColor)}
                />
                <div
                  id='purple'
                  style={{ backgroundColor: '#d7aefb' }}
                  onClick={(e) => setColor(e.target.style.backgroundColor)}
                />
                <div
                  id='pink'
                  style={{ backgroundColor: '#fdcfe8' }}
                  onClick={(e) => setColor(e.target.style.backgroundColor)}
                />
                <div
                  id='brown'
                  style={{ backgroundColor: '#e6c9a8' }}
                  onClick={(e) => setColor(e.target.style.backgroundColor)}
                />
                <div
                  id='gray'
                  style={{ backgroundColor: '#e8eaed' }}
                  onClick={(e) => setColor(e.target.style.backgroundColor)}
                />
              </div>
            </div>
          </div>
          <button
            type='submit'
            className='btn-close'
            style={{ backgroundColor: color, borderColor: color }}>
            {submitName}
          </button>
        </div>
      )}
    </form>
  );
};

export default NoteForm;
