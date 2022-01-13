import moment from "moment";

const NoteBox = ({
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
  createdAt,
  updatedAt,
  onCancel,
}) => {
  return (
    <form
      className={cName}
      onSubmit={onSubmit}
      style={{ backgroundColor: color }}>
      {createdAt && <div className="createdAt">Created At: {moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}</div>}
      {display && (
        <input
          type='text'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ backgroundColor: color }}
          className="titleText"
        />
      )}
      <textarea
        rows={numLine}
        type='text'
        placeholder='Take a note here...'
        className='text-input contentText'
        onClick={openAdd}
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ backgroundColor: color }}
      />

      {display && (
        <div className='note-form-footer'>
          {updatedAt && <div className="updatedAt">Last updated: {moment(updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</div>}
          <div className='color-box'>
            <i className='fa fa-paint-brush'></i>
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
          <button
            type='text'
            className='btn-close'
            onClick={onCancel}
            style={{ backgroundColor: color, borderColor: color }}>
            Cancel
          </button>
        </div>
      )}
    </form>
  );
};

export default NoteBox;
