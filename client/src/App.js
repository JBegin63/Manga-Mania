import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import MangaList from './components/Manga List/MangaList';
import DisplayManga from './components/Manga/DisplayManga';
import User from './components/User/User';
import NewManga from './components/New Manga/NewManga';

function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route element={<Login isLoggedin={isLoggedin} setIsLoggedin={setIsLoggedin} />} path='/' />
          <Route element={<Register isLoggedin={isLoggedin} setIsLoggedin={setIsLoggedin}/>} path='/register' />
          <Route element={<Dashboard />} path='/dashboard' />
          <Route element={<MangaList />} path='/manga' />
          <Route element={<DisplayManga />} path='/manga/:id' />
          <Route element={<NewManga />} path='/add/manga' />
          <Route element={<User />} path='/api/user/:id' />
        </Routes>
      </div>
    </BrowserRouter>
    
  );
}

export default App;