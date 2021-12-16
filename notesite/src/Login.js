import React from 'react';
import { useState } from 'react';

import LogoImg from './images/Logo.jpg'
import LogoutImg from './images/Logout.jpg'
import ContactUsImg from './images/ContactUs.jpg'
import NoteList from './NoteList'
import Creator from './Creator'
import Editor from './Editor';
import { Context } from './Context';
import NoteItem from './NoteItem';
import { getNotesView, changeNoteView, deleteNoteView, pinNoteView, unpinNoteView, addNoteView } from './services/BackApi';

var currentId = { id: 0 };

function Login() {
    const [notes, setNotes] = useState([])  
        getNotesView({setNotes});
 
    function changeNote(id, title, text) {
        console.log(currentId['id'])
        changeNoteView(currentId['id'], title, text)
    }

    function addNote(title, text) {
        addNoteView(title, text)
    }

    function deleteNote(id) {
        deleteNoteView(id)
        console.log(notes);
    }

    function pinNote(id, isPinned) {
        currentId['id'] = id;

        pinNoteView(id, isPinned)
        document.getElementById(currentId['id'] + '').style.display = 'none';
    }

    function setEditorOptions(note) {
        currentId['id'] = note.id;
        document.getElementById('editor-title').value = note.title;
        document.getElementById('editor-text').value = note.text;
    }
    
    function getCurrentNote() {
        if (notes.length == 0) {
            return {id:-1, title: '', text:''};
        }
        return notes.filter(note=>note.id == currentId['id'])
    }

    return (
        <div className='preview'>
            <nav className='navigate-bar'>       
                <a  href='/' > <img src={LogoImg} class="logo"/></a>
                <a  href='/' > <img src={LogoutImg} class="logout"/></a>
                <a  href='/contactus' > <img src={ContactUsImg} class="contact-us"/></a>
                <Context.Provider value={{changeNote, deleteNote, addNote, pinNote, setEditorOptions, getCurrentNote }}>
                    <NoteList class='note-list' notes={notes} />
                    <Editor />
                    <Creator />
                </Context.Provider>
            </nav>
        </div>)
}

export default Login;


