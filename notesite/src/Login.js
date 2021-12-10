import React from 'react';
import { useState } from 'react';

import LogoImg from './images/Logo.jpg'
import LogoutImg from './images/Logout.jpg'
import ContactUsImg from './images/ContactUs.jpg'
import NoteList from './NoteList'
import Creator from './Creator'
import EditorList from './EditorList';
import { Context } from './Context';

function Login() {
    const currentId = useState(0);
    const [notes, setNotes] = useState([
        {id:0,title:'1111111111111111111111', text:'1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111'},
        {id:1,title:'2222222222222222222222', text:'2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222'},
        {id:2,title:'3333333333333333333333', text:'3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333'},
        {id:3,title:'4444444444444444444444', text:'4444444444444444444444444444444444444444444444444444444444444444444444444444444444444444'},
        {id:4,title:'5555555555555555555555', text:'5555555555555555555555555555555555555555555555555555555555555555555555555555555555555555'},
        {id:5,title:'6666666666666666666666', text:'6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666'},
        {id:6,title:'7777777777777777777777', text:'7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777'},
        {id:7,title:'8888888888888888888888', text:'8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888'},
        {id:8,title:'9999999999999999999999', text:'9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999'},
    ])


    function changeTitle(id, title) {
        setNotes(notes.map(note=>{
            if (note.id == id) {
                note.title = title;
            }
            return note;
        }))
    }

    function changeText(id, text) {
        setNotes(notes.map(note=>{
            if (note.id == id) {
                note.text = text;
            }
            return note;
        }))
    }

    function addNote(title, text) {
        setNotes([...notes, {id: notes.length, title:title, text:text}])
        return notes.length;
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
        let changedNotes = notes.filter(note=>note.id != id);
        rebuildIds(changedNotes)

        setNotes(changedNotes)
        console.log(notes);
    }

    function pinNote(id) {
        let changedNotes = [notes[id], ...(notes.filter(note=>note.id != id))];
        rebuildIds(changedNotes)

        setNotes(changedNotes)
    }

    return (
        <div className='preview'>
            <nav className='navigate-bar'>       
                <a  href='/' > <img src={LogoImg} class="logo"/></a>
                <a  href='/' > <img src={LogoutImg} class="logout"/></a>
                <a  href='/contactus' > <img src={ContactUsImg} class="contact-us"/></a>
                <Context.Provider value={{changeTitle, changeText, deleteNote, addNote, pinNote, notes }}>
                    <NoteList class='note-list' notes={notes} />
                    <EditorList notes={notes}/>
                    <Creator />
                </Context.Provider>
            </nav>
        </div>)
}

export default Login;