import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import MangaList from './components/Manga List/MangaList';
import DisplayManga from './components/Display Manga/DisplayManga';
import User from './components/User/User';
import NewManga from './components/New Manga/NewManga';

function App() {
  return (
    <BrowserRouter>
      <div className="App" >
        <Routes>
          <Route element={<Login />} path='/' />
          <Route element={<Register />} path='/register' />
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