import React, { useContext } from 'react';
import { useState } from 'react';
import { Context } from './Context';
import ExitEditorImg from './images/ExitEditor.png'
import './style/note-editor.css'


function Creator() {
    const { addNote } = useContext(Context);
    function exitCreator() {
        document.getElementById('creator').style.display = 'none';
        document.getElementById('text').value = ''
        document.getElementById('title').value = ''
    }
    function saveNewNote() {
        const title = document.getElementById('title').value;
        const text = document.getElementById('text').value;
        addNote(title, text);
        document.getElementById('creator').style.display = 'none';
        document.getElementById('text').value = ''
        document.getElementById('title').value = ''
    }
    return (           
        <div class='editor' id='creator'>
            <div class='editor-border'>
                <div class='editor-line'></div>  
                <textarea class='editor-title' wrap='off' placeholder='Title' id='title'></textarea> 
                <textarea class='editor-text'  placeholder='Text of my new note...' id='text'></textarea> 
                <button class='save-button' onClick={saveNewNote}>Save</button>
                <button><img class='exit-editor' src={ExitEditorImg} onClick={exitCreator}/></button>
            </div> 
        </div>
    )
}

export default Creator;