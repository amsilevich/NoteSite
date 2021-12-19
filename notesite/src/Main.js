import Preview from './Preview';
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import Login from './Login'
import ContactUs from './ContactUs'
import NotFound from './NotFound'
import { useReducer } from 'react';
import {reducer} from './SignIn';
import { useState } from 'react';
import {ContextDispatch} from './Context'


function Main() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Preview />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='*' element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  );
}

export default Main;