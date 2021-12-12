import React, { useContext } from 'react';
import NoteItem from './NoteItem'
import NewItem from './NewItem'
import { getNotesView } from './services/BackApi';

import './style/notes-list.css'

function NoteList({notes}) {
    //console.log('nice')
    // console.log(notes);
    // let notes = getNotesView()
    // console.log('sdcsdsdc')
    //console.log(notes)
    return (
        <div className='container' id='note-list'>
            <div className='list'>
                {notes.map(note=><NoteItem key={note.id} note={note} />)}
                {<NewItem />}
            </div>
        </div>
    )
}

export default NoteList;