import React, { useContext } from 'react';
import { Context } from './Context';
import PenImg from './images/Pen.png'
import BinImg from './images/Bin.png'
import PinImg from './images/Pin.png'

var counter = 0;

function NoteItem({note}) {
    const {setEditorOptions, deleteNote, pinNote} = useContext(Context);

    function openOptions() {
        //if (counter == 0) return;
        //counter++;
        console.log("HERE AGAIN: " + note.id)  
        document.getElementById(note.id + '').style.display = 'block';
    }

    function closeOptions() {
        //counter--;
        console.log("CLOSE: " + note.id)  

        document.getElementById(note.id + '').style.display = 'none';
    }

    function openEditor() {
        console.log('openeditor: ' + note.id)
        setEditorOptions(note);
        document.getElementById('editor').style.display = 'block';
    }

    let border_class = (note.isPinned) ? 'border_pinned' : 'border'

    return (        
        <div>              
            <div class={border_class} onMouseEnter = { openOptions} onMouseLeave    ={closeOptions}>
                <div class='title'>{note.title}</div>
                <div class='line'> </div>
                <div class='text'>{note.text}</div>  
                <div class='cover' id={note.id}>
                    <button class='bin' onClick={()=>{deleteNote(note.id)}}><img src={BinImg} class='bin-img' /></button>
                    <button class='pin' onClick={()=>{pinNote(note.id, note.isPinned)}}><img src={PinImg} class='pin-img' /></button>
                    <button class='pen' onClick={()=>{openEditor()}}><img src={PenImg} class='pen-img' /></button>
                </div> 
            </div>  
        </div>   

    );
}
export default NoteItem;