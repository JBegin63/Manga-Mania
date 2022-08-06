import React, { useState } from 'react';
import profilePic from './profilePic.png';
import './styles.css';
import Header from '../Header/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewManga = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [manga, setManga] = useState({
        title: '',
        author: '',
        score: '',
        volumesCurrentlyOut: '',
        mangaStatus: '',
        synopsis: '',
        coverImage: ''
    });

    const handleChange = (e) => {
        setManga({
            ...manga,
            [e.target.name]: e.target.value,
        });
    };
    const submitHandler = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8000/api/manga', manga, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                navigate('/manga')
            })
            .catch((err) => {
                console.log(err.response.data.error);
                setErrors(err.response.data.error);
            })
    }

    return (
        <div className='mangaPic-container'>
            <Header />
            <div className='row'>
                <h1 className='my-4'>Add A Manga</h1>
            </div>
            <form className='form d-flex justify-content-center align-items-center' onSubmit={submitHandler}>
                <div className='col-auto mx-5 mb-5 mangaPic'>
                    <img className='profilePic' src={profilePic} alt='cover img' />
                    <div className='form-group mt-4'>
                        <input 
                            type="text"
                            id='coverImage'
                            className='form-control'
                            name='coverImage'
                            onChange={handleChange}
                            value={manga.coverImage}
                            placeholder='   Upload Cover Image'
                        />
                    </div>
                </div>
                <div className='col-4 mx-5'>
                    <div className='row my-4'>
                        <div className='col'>
                            <div className='form-group'>
                                <input
                                    type="text"
                                    name='title'
                                    value={manga.title}
                                    className='form-control'
                                    onChange={handleChange}
                                    placeholder='Title'
                                    required
                                />
                            </div>
                        </div>
                        <div className='col'>
                            <div className='form-group'>
                                <input
                                    type="text"
                                    name='author'
                                    value={manga.author}
                                    className='form-control'
                                    onChange={handleChange}
                                    placeholder='Author'
                                    required
                                />
                            </div>
                        </div>
                        <div className='row mt-2'>
                            {errors.title && <span className="text-danger">{errors.title.message}</span>}
                            {errors.author && <span className="text-danger">{errors.author.message}</span>}
                        </div>
                    </div>
                    <div className='row align-items-center'>
                        <div className='col-3'>
                            <div className='form-group'>
                                <input
                                    type="number"
                                    name='score'
                                    value={manga.score}
                                    className='form-control'
                                    onChange={handleChange}
                                    placeholder='Score'
                                    required
                                    min="1"
                                    max="10"
                                />
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className='form-group'>
                                <input
                                    type="number"
                                    name='volumesCurrentlyOut'
                                    value={manga.volumesCurrentlyOut}
                                    className='form-control'
                                    onChange={handleChange}
                                    placeholder='Volumes Currently Printed'
                                    required
                                />
                            </div>
                        </div>
                        <div className='col-2 align-items-center'>
                            <div className='form-group'>
                                <select 
                                    name="mangaStatus" 
                                    id="mangaStatus" 
                                    onChange={handleChange} 
                                    value={manga.mangaStatus}
                                >
                                    <option>Manga Status</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Ongoing">Ongoing</option>
                                    <option value="On Hiatus">On Hiatus</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='row mt-2'>
                        {errors.score && <span className="text-danger">{errors.score.message}</span>}
                        {errors.volumesCurrentlyOut && <span className="text-danger">{errors.volumesCurrentlyOut.message}</span>}
                        {errors.mangaStatus && <span className="text-danger">{errors.mangaStatus.message}</span>}
                    </div>
                    <div className='row mt-4'>
                        <div className='form-group'>
                            <textarea name="synopsis" id="synopsis" cols="30" rows="10" placeholder='Write a synopsis here...' className='form-control' onChange={handleChange}></textarea>
                            {errors.synopsis && 
                            <span className="text-danger">{errors.synopsis.message}</span>}
                        </div>
                    </div>
                    <div className='align-items-center mt-4'>
                        <button className='btn btn-success'>Add Manga</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default NewManga