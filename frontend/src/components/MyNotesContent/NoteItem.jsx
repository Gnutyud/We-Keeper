import moment from 'moment';
import React, { useContext } from 'react';
import AppContext from '../../store/context';

function NoteItem(props) {
  const { viewingMode } = useContext(AppContext);
  const { data, onClick, handleEdit, removeNoteItem, onClose } = props;

  const handleDeleteNote = (e) => {
    e.stopPropagation();
    removeNoteItem();
  };

  const handleEditNote = (e) => {
    e.stopPropagation();
    handleEdit();
  };
  return (
    <div
      className={viewingMode === 'view' ? 'note-box edit-form viewing' : 'note-box note-box-item'}
      style={{ backgroundColor: data.color }}
      onClick={!viewingMode ? onClick : undefined}
      onKeyDown={!viewingMode ? onClick : undefined}
    >
      <i className="fa fa-pencil" aria-hidden="true" onClick={(e) => handleEditNote(e)} />
      <i className="fa fa-trash-o" aria-hidden="true" onClick={(e) => handleDeleteNote(e)} />
      <div className="viewing-content">
        {viewingMode && data.createdAt && (
          <div className="createdAt" style={{ padding: '10px 0px 0px 0px' }}>
            Created At: {moment(data.createdAt).calendar()}
          </div>
        )}
        <h3 className={!viewingMode ? 'title-preview' : ''}>{data.title}</h3>
        {!viewingMode ? (
          <p className="text-preview">{data.text}</p>
        ) : (
          <textarea
            readOnly
            className="text-view"
            style={{ backgroundColor: data.color }}
            value={data.text}
          />
        )}
      </div>
      {viewingMode && (
        <div className="viewing-bottom">
          {data.updatedAt ? (
            <div className="updatedAt" style={{ padding: '0px' }}>
              Updated At: {moment(data.updatedAt).calendar()}
            </div>
          ) : (
            <div />
          )}
          <button type="text" className="btn-close" style={{ backgroundColor: data.color }} onClick={onClose}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default NoteItem;
