import React, { useContext } from 'react';
import { Context } from './Context';
import PenImg from './images/Pen.png'
import BinImg from './images/Bin.png'
import PinImg from './images/Pin.png'


function NoteItem({note}) {
    let {currentId, setEditorOptions} = useContext(Context);
    // console.log("note" + note.title);
    const {deleteNote, pinNote} = useContext(Context);

    function openOptions() {
        console.log(note)  
        document.getElementById(note.id + '').style.display = 'block';
    }

    function closeOptions() {
        document.getElementById(note.id + '').style.display = 'none';
    }

    function openEditor() {
        console.log('openeditor: ' + note.id)
        setEditorOptions(note);
        document.getElementById('editor').style.display = 'block';
    }

    return (        
        <div>              
            <div class='border' onMouseOver={openOptions} onMouseOut={closeOptions}>
                <div class='title'>{note.title}</div>
                <div class='line'> </div>
                <div class='text'>{note.text}</div>  
                <div class='cover' id={note.id}>
                    <button class='bin' onClick={()=>{deleteNote(note.id)}}><img src={BinImg} class='bin-img' /></button>
                    <button class='pin' onClick={()=>{pinNote(note.id)}}><img src={PinImg} class='pin-img' /></button>
                    <button class='pen' onClick={()=>{openEditor()}}><img src={PenImg} class='pen-img' /></button>
                </div> 
            </div>  
        </div>   

    );
}
export default NoteItem;