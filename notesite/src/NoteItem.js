import React, { useContext } from 'react';
import { Context } from './Context';
import PenImg from './images/Pen.png'
import BinImg from './images/Bin.png'
import PinImg from './images/Pin.png'


function NoteItem({note}) {
    console.log("note" + note.title);
    const {deleteNote, pinNote} = useContext(Context);
    const blur_id = 'blur'+note.id;

    function openOptions() {
        document.getElementById(note.id + '').style.display = 'block';
    }

    function closeOptions() {
        document.getElementById(note.id + '').style.display = 'none';
    }

    function openEditor() {
        console.log(note.id);
        document.getElementById('editor'+note.id).style.display = 'block';
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