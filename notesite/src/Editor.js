import React, { useContext } from 'react';
import { useState } from 'react';
import { Context } from './Context';
import ExitEditorImg from './images/ExitEditor.png'
import './style/note-editor.css'


function Editor({note}) {
    console.log("editor" + note.title);
    const { changeTitle, changeText } = useContext(Context);

    function exitEditor() {
        document.getElementById('editor' + note.id).style.display = 'none';
        document.getElementById('title' + note.id).value =note.title
        document.getElementById('text' + note.id).value = note.text
    }
    
    function saveNote() {
        const title = document.getElementById('title' + note.id).value;
        const text = document.getElementById('text' + note.id).value;
        changeTitle(note.id, title);
        changeText(note.id, text)
        document.getElementById('editor' + note.id).style.display = 'none';
    }

    return (           
        <div class='editor' id={'editor' + note.id}>
            <div class='editor-border'>
                <div class='editor-line'></div>  
                <textarea class='editor-title' wrap='off' placeholder='Title' id={'title'+note.id}>{note.title}</textarea> 
                <textarea class='editor-text'  placeholder='Text of my new note...' id={'text'+note.id}>{note.text}</textarea> 
                <button onClick={saveNote} class='save-button'>Save</button>
                <button><img class='exit-editor' src={ExitEditorImg} onClick={exitEditor}/></button>
            </div> 
        </div>
    )
}

export default Editor;