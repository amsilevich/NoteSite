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
import { getNotesView, changeNoteView, deleteNoteView, pinNoteView, addNoteView } from './services/BackApi';

var currentId = { id: 0 };

function Login() {
    const [notes, setNotes] = useState([
   ])  
        getNotesView({setNotes});
 
    function changeNote(id, title, text) {
        // setNotes(notes.map(note=>{
        //     if (note.id == currentId) {
        //         note.title = title;
        //         note.text = text;
        //     }
        //     return note;
        // }))
        console.log(currentId['id'])
         changeNoteView(currentId['id'], title, text)
    }

    function addNote(title, text) {

        // let maxId = 0;
        // console.log(notes);
        // for (let i = 0; i < notes.length; i++) {
        //     if (notes[i].id >= maxId) {
        //         maxId = notes[i].id; 
        //     }
        // }
        // console.log(maxId + 1);
        // setNotes([...notes, {id: maxId + 1, title:title, text:text}])
        // return notes.length;
        addNoteView(currentId, title, text)
    }

    function rebuildIds(notes) {
        let curId = 0;
        notes = notes.map(note=>{
            note.id = curId;
            curId++;
            return note;
        })
    }

    function deleteNote(id) {
        // let changedNotes = notes.filter(note=>note.id != id);

        // setNotes(changedNotes)
        deleteNoteView(id)
        console.log(notes);
    }

    function pinNote(id) {
    //     let changedNotes = [...(notes.filter(note=>note.id == id)), ...(notes.filter(note=>note.id != id))];

    //     setNotes(changedNotes)
        pinNoteView(id)
    }

    function setEditorOptions(note) {

        console.log(note.id)
        currentId['id'] = note.id;
        console.log(currentId['id'])
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


