import moment from 'moment';
import React, { useRef } from 'react';
import useOnClickOutside from '../../hooks/useOnClickOutside';

function NoteBox({
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
}) {
  const backgroundColors = [
    { name: 'white', color: '#ffffff' },
    { name: 'red', color: '#f28b82' },
    { name: 'yellow', color: '#fbbc04' },
    { name: 'light-yellow', color: '#fff475' },
    { name: 'bright-yellow', color: '#ccff90' },
    { name: 'blue', color: '#a7ffeb' },
    { name: 'blue2', color: '#cbf0f8' },
    { name: 'blue3', color: '#aecbfa' },
    { name: 'purple', color: '#d7aefb' },
    { name: 'pink', color: '#fdcfe8' },
    { name: 'brown', color: '#e6c9a8' },
    { name: 'gray', color: '#e8eaed' },
  ];
  const ref = useRef();
  useOnClickOutside(ref, () => {
    if (display) onCancel();
  });

  return (
    <form className={cName} onSubmit={onSubmit} ref={ref} style={{ backgroundColor: color }}>
      {createdAt && <div className="createdAt">Created At: {moment(createdAt).calendar()}</div>}
      {display && (
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ backgroundColor: color }}
          className="titleText"
        />
      )}
      <textarea
        rows={numLine}
        type="text"
        placeholder="Take a note here..."
        className={!display ? 'text-input contentText addClick' : 'text-input contentText'}
        onClick={!display ? openAdd : undefined}
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ backgroundColor: color }}
      />

      {display && (
        <div className="note-form-footer">
          {updatedAt && <div className="updatedAt">Last updated: {moment(updatedAt).calendar()}</div>}
          <div className="color-box">
            <i className="fa fa-paint-brush" />
            <div className="dropdown-color">
              <div className="color-items">
                {backgroundColors.map((bgc) => (
                  <div
                    role="button"
                    tabIndex={0}
                    aria-label="select color"
                    key={bgc.name}
                    id={bgc.name}
                    style={{ backgroundColor: bgc.color }}
                    onClick={(e) => setColor(e.target.style.backgroundColor)}
                    onKeyDown={(e) => setColor(e.target.style.backgroundColor)}
                  />
                ))}
              </div>
            </div>
          </div>
          <button type="submit" className="btn-close" style={{ backgroundColor: color, borderColor: color }}>
            {submitName}
          </button>
          <button
            type="button"
            className="btn-close"
            onClick={onCancel}
            style={{ backgroundColor: color, borderColor: color }}
          >
            Cancel
          </button>
        </div>
      )}
    </form>
  );
}

export default NoteBox;
