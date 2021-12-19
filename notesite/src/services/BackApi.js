import { useContext } from "react";
import { loginSucceed, loginFailed, refreshFailed, dataLoaded, nonAuthorized } from "../SignIn"

const baseUrl = 'http://127.0.0.1:8000/api/'

export async function setUpNotesView({dispatch}) {
    await refreshTokensView({dispatch})
    let notes;
    await fetch(baseUrl + 'get_all/', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json;charset=utf-8', 
            'Authorization': 'JWT ' + localStorage.getItem('access')
        },
    })
    .then(data=>data.json())
    .then(data=>{
        notes = data;
    })
    return notes;
}


export async function getNotesView({setNotes, dispatch}) {
    await refreshTokensView({dispatch})
    await fetch(baseUrl + 'get_all/', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json;charset=utf-8', 
            'Authorization': 'JWT ' + localStorage.getItem('access')
        },
    })
    .then(data=>data.json())
    .then(data=>{
        setNotes(data);
    })
    dispatch(dataLoaded())
}

export async function changeNoteView(id, title, text, {setNotes, dispatch}) {  
    await refreshTokensView({dispatch})
    await fetch(baseUrl + 'drop/' + id, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json;charset=utf-8',
            'Authorization': 'JWT ' + localStorage.getItem('access')
        },
        body: JSON.stringify({
            title: title,
            text: text
        })
    }).then(data=>data.json())
    .then(data=>console.log(data))
    .then(await getNotesView({setNotes, dispatch}))
    await getNotesView({setNotes, dispatch})
} 

export async function deleteNoteView(id, {setNotes, dispatch}) {
    await refreshTokensView({dispatch})
    await fetch(baseUrl + 'drop/' + id, {
        method: 'DELETE',
        headers: {
            'Authorization': 'JWT ' + localStorage.getItem('access')
        },
    }).then(await getNotesView({setNotes, dispatch}))
    await getNotesView({setNotes, dispatch})
} 

export async function pinNoteView(id, isPinned, {setNotes, dispatch}) {
    await refreshTokensView({dispatch}) 
    let needToPin = (isPinned) ? 'False' : 'True';
    await fetch(baseUrl + 'drop/' + id, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json;charset=utf-8',
            'Authorization': 'JWT ' + localStorage.getItem('access')
        },
        body: JSON.stringify({
            isPinned: needToPin,
        })
    }).then(data=>data.json()).then(await getNotesView({setNotes, dispatch}))
    await getNotesView({setNotes, dispatch})
} 

export async function unpinNoteView(id, {setNotes, dispatch}) { 
    await refreshTokensView({dispatch})
    await fetch(baseUrl + 'drop/' + id, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json;charset=utf-8',
            'Authorization': 'JWT ' + localStorage.getItem('access')
        },
        body: JSON.stringify({
            isPinned: 'False',
        })
    }).then(data=>data.json()).then(await getNotesView({setNotes, dispatch}))
    await getNotesView({setNotes, dispatch})
} 

export async function addNoteView(title, text, {setNotes, dispatch}) {
    console.log(title)
    console.log(text)
    await refreshTokensView({dispatch})
    await fetch(baseUrl + 'create/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json;charset=utf-8',
            'Authorization': 'JWT ' + localStorage.getItem('access')
        },
        body: JSON.stringify({
            title: title,
            text: text,
            isPinned: 'False',
        })
    }).then(data=>data.json()).then(data=>console.log(data)).then(await getNotesView({setNotes, dispatch}))
    await getNotesView({setNotes, dispatch})
}

export async function getTokensView(username, password, {dispatch}) {
    await fetch(baseUrl + 'token/obtain/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            username: username,
            password: password,
        })
    }).then((response)=>{ 
        console.log(response);
        if (!response.ok) {
            throw 'hui';
        }
        return response.json()
    })
    .then((data)=> {
        console.log(data)
        localStorage.setItem('refresh', data['refresh'])
        localStorage.setItem('access', data['access'])
        console.log(localStorage.getItem('refresh'))
        console.log(localStorage.getItem('access'))
        dispatch(loginSucceed())
        console.log("HUIUUIIUUHU")
    }).catch(e=>{
        dispatch(loginFailed());
        console.log(e)
    })
}


export async function refreshTokensView({dispatch}) {
    await fetch(baseUrl + 'token/refresh/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            refresh: localStorage.getItem('refresh'),
        })
    }).then((response)=>{ 
        console.log(response);
        if (!response.ok) {
            throw 'hui';
        }
        return response.json()
    })
    .then((data)=> {
        console.log(data)
        localStorage.setItem('refresh', data['refresh'])
        localStorage.setItem('access', data['access'])
        console.log(localStorage.getItem('refresh'))
        console.log(localStorage.getItem('access'))
    }
    ).catch(e=> {
        dispatch(nonAuthorized());
        console.log(e)
    })
}

export async function createUserView(username, password, {dispatch}) {
    await fetch(baseUrl + 'user/create/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            email: "",
            username: username,
            password: password
        })
    }).then((response)=>{ 
        console.log(response);
        if (!response.ok) {
            throw 'hui';
        }
        return response.json()['data'   ]
    })
}