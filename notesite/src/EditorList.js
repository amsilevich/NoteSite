import React  from 'react';
import Editor from './Editor'

import './style/notes-list.css'

function EditorList({notes}) {
    // console.log(notes);
    return (
        <div>
            {notes.map(note=><Editor note={note} />)}
        </div>
    )
}

export default EditorList;