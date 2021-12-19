import React, { useContext } from 'react';
import { useState } from 'react';
import { Context } from './Context';
import ExitEditorImg from './images/ExitEditor.png'
import './style/note-editor.css'


function Editor() {
    const { getCurrentNote, changeNote } = useContext(Context);

    const note = getCurrentNote();

    function exitEditor() {
        document.getElementById('editor').style.display = 'none';
    }
    
    function saveNote() {
        console.log(note)
        console.log('noteid: ' + note.id)
        const title = document.getElementById('editor-title').value;
        const text = document.getElementById('editor-text').value;
        changeNote(note.id, title, text)
        document.getElementById('editor').style.display = 'none';
    }

    return (           
        <div class='editor' id='editor'>
            <div class='editor-border'>
                <div class='editor-line'></div>  
                <textarea class='editor-title' wrap='off' placeholder='Title' id='editor-title'>{note.title}</textarea> 
                <textarea class='editor-text'  placeholder='Text of my new note...' id='editor-text'>{note.text}</textarea> 
                <button onClick={saveNote} class='save-button'>Save</button>
                <button class='exit-editor'><img class='exit-editor-img' src={ExitEditorImg} onClick={exitEditor}/></button>
            </div> 
        </div>
    )
}

export default Editor;