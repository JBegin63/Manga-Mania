import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import MangaList from './components/Manga List/MangaList';
import Manga from './components/Manga/Manga';
import User from './components/User/User';

function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route element={<Login setIsLoggedin={setIsLoggedin} />} path='/' />
          <Route element={<Register setIsLoggedin={setIsLoggedin}/>} path='/register' />
          <Route element={<Dashboard />} path='/dashboard' />
          <Route element={<MangaList />} path='/manga' />
          <Route element={<Manga />} path='/manga/:id' />
          <Route element={<User />} path='/user/:id' />
        </Routes>
      </div>
    </BrowserRouter>
    
  );
}

export default App;