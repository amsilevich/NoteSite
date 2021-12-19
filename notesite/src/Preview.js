import React, { useContext } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ExitImg from './images/Exit.png'
import LogoImg from './images/Logo.jpg'
import LoginImg from './images/Login.jpg'
import ContactUsImg from './images/ContactUs.jpg'
import EyeImg from './images/Eye.png'
import EyeCrossImg from './images/EyeCross.png'
import SiteOptionsImg from './images/SiteOptions.png'
import SiteIntroImg from './images/SiteIntro.png'
import { createUserView, getNotesView, getTokensView, setUpNotesView } from './services/BackApi';
import { useState } from 'react';
import { loginSucceed, reducer } from  './SignIn'
import { useReducer } from 'react'



import $ from 'jquery'
import './style/login.css'
import './style/preview.css'
import { ContextDispatch } from './Context';


function Preview() {
    localStorage.clear();

    const [state, dispatch] = useReducer(reducer, {
        Authorized: false,
    });
      
    function open_login_icon(id_popap) {
        $("#login_icon").addClass('active');
    }

    function close_login_icon(id_popap) {
        $("#login_icon").removeClass('active');
    }

    async function getTokens(username, password) {
        await getTokensView(username, password, {dispatch})
    }

    async function signIn() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        await getTokens(username, password);
        if (state['Authorized'] == true) {
            document.location.href += 'login';
        }
    }
      
    async function signUp() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        await createUserView(username, password, {dispatch});
        await getTokens(username, password);
        if (state['Authorized'] == true) {
            document.location.href += 'login';
        }
    } 

    function showPassword() {
        const element = document.getElementById('password');
        if (element.type == 'password') {
            element.type = 'text'
        }
        else {
            element.type = 'password';
        }
        const image = document.getElementById('eye');
        if (image.src == "http://localhost:3000/static/media/Eye.e712642c.png") {
            image.src = "http://localhost:3000/static/media/EyeCross.106c5a9d.png";
        }
        else {
            image.src = "http://localhost:3000/static/media/Eye.e712642c.png";
        }
    }

    return (
        <div className='preview'>
            <nav className='navigate-bar'>       
                <a  href='/'><img src={LogoImg} class="logo"/></a>
                <button  onClick={open_login_icon} className='exit-btn'> <img src={LoginImg} class="login"/></button>
                <a  href='/contactus'> <img src={ContactUsImg} class="contact-us"/></a>
            </nav>
            <div class='text-item-up'>
                <img className='image-up' src={SiteIntroImg}/>
                <div className='title-up'>Write your notes</div>
                <div className='text-up'>
                    You can leave notes about 
                    important matters/meetings/events  
                    or just write your thoughts.
                </div>
            </div>
            <div className='text-frame-down'>
                <img className='image-down' src={SiteOptionsImg}/>
                <div className='title-down'>Refactor it!</div>
                <div className='text-down'>
                    You have the option to delete - 
                    leave only the best notes. 
                    You can add a new note or edit existing one 
                    at any time 
                </div>
            </div>
            <div className='blur' id="login_icon"> 
                <div className='form-out'> 
                    <button class="exit-btn" onClick={close_login_icon}><img src={ExitImg} class="exit"/></button>
                    <div className='form-welcome'>
                        <div className='welcome-text'>
                        Welcome to NoteSite!</div> 
                    </div>
                    <div className='form-in'> 
                        <div className='intro-text'>Introduce yourself</div>
                        <input className='username' placeholder='Username' id='username'></input> 
                        <input className='password' placeholder='Password' type="password" id="password"/>
                        <button onClick={showPassword} class='eye'><img src={EyeImg} class='eye-img' id='eye'/></button>
                        <button className='sign-in' onClick={signIn}>
                            <div className='sign-in-text'>Sign in</div>
                        </button>
                        <button className='sign-up' onClick={signUp}> 
                            <div className='sign-up-text'>Sign up</div>
                        </button>
                    </div>
                </div> 
            </div> 
        </div>
    )
}

export default Preview;