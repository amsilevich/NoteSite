import React, { useContext } from 'react';
import { Context } from './Context';
import PlusImg from './images/Plus.png'
import './style/notes-list.css'

function NewItem() {
    function openEditor() {
        document.getElementById('creator').style.display = 'block';
    }

    return (
        <div class='border-new-item'>
            <button class='plus' onClick={openEditor}><img src={PlusImg} class='plus-img' /></button>
            <div class='create-new-text'>Create new note!</div>
        </div>
    );
}
export default NewItem;