import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import './styles.css'
import profilePic from './profilePic.png';
import { Link } from 'react-router-dom';
const MangaList = () => {

    const [manga, setManga] = useState([]);
    useEffect(() => {
        axios
        .get('http://localhost:8000/api/manga')
        .then((res) => {
            console.log(res.data);
            setManga(res.data);
        })
        .catch((err) => {
            console.log('Failed to load comments', err)
        })
    }, [])

    return (
        <div className='mangalist-container'>
            <Header />
            <div className='d-flex justify-content-evenly mt-1'>
                <div className='col-8 allManga'>
                    <div className='d-flex flex-wrap justify-content-between py-2 px-4 mt-5'>
                        <h1>All Manga</h1>
                        <form>
                            <select name="filter" id="filter">
                                <option value="allManga">All</option>
                                <option value="favoritedManga">Favorited</option>
                            </select>
                        </form>
                    </div>
                    <div className='d-flex flex-wrap justify-content-evenly align-items-center mt-5'>
                        {manga.map((manga) => (
                            <div key={manga._id} className='card mb-4' style={{ flex: "0 0 30%" }}>
                                <Link to={`/manga/${manga._id}`} style={{ textDecoration: 'none'}}>
                                    <img className='card-img-top' src={manga.coverImage} alt='Card pic' />
                                    <div className='card-body'>
                                        <h2 className='card-title'>{manga.title}</h2>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MangaList