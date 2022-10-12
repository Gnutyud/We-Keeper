import moment from "moment";
import React from "react";

const NoteItem = (props) => {
  return <div
      className={props.isViewing ? "note-box edit-form viewing" : "note-box note-box-item"}
      style={{ backgroundColor: props.color }}
      onClick={!props.isViewing ? props.onClick : undefined}
    >
    <i
      className='fa fa-pencil'
      aria-hidden='true'
      onClick={props.handleClick}
    ></i>
    <i
      className='fa fa-trash-o'
      aria-hidden='true'
      onClick={props.removeNoteItem}></i>
      <div className="viewing-content">
        {props.createdAt && <div className="createdAt" style={{ padding: "10px 0px 0px 0px" }}>Created At: {moment(props.createdAt).calendar()}</div>}
        <h3 className={!props.isViewing ? "title-preview" : ""}>{props.title}</h3>
        {!props.isViewing ? <p className="text-preview">{props.text}</p> : <textarea readOnly className="text-view" style={{ backgroundColor: props.color }} value={props.text} />}

      </div>
      {props.isViewing && <div className="viewing-bottom">
        {props.updatedAt ? <div className="updatedAt" style={{ padding: "0px" }}>Updated At: {moment(props.updatedAt).calendar()}</div> : <div></div>}
        <button type='text' className='btn-close' style={{ backgroundColor: props.color }} onClick={props.onClose}>Close</button>
      </div>}

    </div>
}

export default NoteItem;