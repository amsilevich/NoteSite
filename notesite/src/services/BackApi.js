import { useContext } from "react";

const baseUrl = 'http://127.0.0.1:8000/api/'

export function getNotesView({setNotes}) {
    fetch(baseUrl + 'get_all/').then(data=>data.json()).then(data=>setNotes(data))
}

export function changeNoteView(id, title, text) {  
    fetch(baseUrl + 'drop/' + id, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            title: title,
            text: text
        })
    }).then(data=>data.json())
} 

export function deleteNoteView(id) {  
    fetch(baseUrl + 'drop/' + id, {
        method: 'DELETE'
    }).then(data=>data.json())
} 

export function pinNoteView(id) {  
    fetch(baseUrl + 'drop/' + id, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            isPinned: 'True',
        })
    }).then(data=>data.json())
} 

export function addNoteView(title, text) {
    fetch(baseUrl + 'create/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            title: title,
            text: text,
            isPinned: 'False',
        })
    }).then(data=>data.json())
}
