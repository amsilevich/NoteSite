import Preview from './Preview';
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import Login from './Login'
import ContactUs from './ContactUs'
import NotFound from './NotFound'

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