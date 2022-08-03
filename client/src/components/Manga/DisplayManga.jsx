import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import NavbarComponent from '../Nav/Nav';
import profilePic from './profilePic.png';

const DisplayManga = () => {
    const [manga, setManga] = useState([]);
    const [creator, setCreator] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);
    const [errors, setErrors] = useState({});
    const { id } = useParams('');
    const navigate = useNavigate('');
    const [editManga, setEditManga] = useState({
        title: '',
        author: '',
        score: '',
        volumesCurrentlyOut: '',
        mangaStatus: '',
        synopsis: '',
        coverImage: ''
    });

    const handleChange = (e) => {
        setEditManga({
            ...editManga,
            [e.target.name]: e.target.value,
        });
    };

    // Getting manga 
    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/manga/${id}`, { withCredentials: true })
            .then((res) => {
                console.log(res.data[0]);
                setManga(res.data[0]);
                console.log(res.data[0].createdBy);
                setCreator(res.data[0].createdBy);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [id])

    // Getting current user
    useEffect(() => {
        axios
        .get('http://localhost:8000/api/current-user', { withCredentials: true })
            .then((res) => {
                console.log(res.data._id);
                setCurrentUser(res.data._id);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [setCurrentUser])

    // Submit button for editing manga
    const submitHandler = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:8000/api/manga/${id}`, { withCredentials: true })
            .then((res) => {
                console.log(res);
                navigate('/manga')
            })
            .catch((err) => {
                console.log(err.response.data);
                setErrors(err.response.data);
            })
    }

    return (
        <div className='mangaPic-container'>
            <NavbarComponent />
            <div className='row'>
                <h1 className='my-4'>{manga.title}</h1>
            </div>
            <form className='form d-flex justify-content-center align-items-center' onSubmit={submitHandler}>
                <div className='col-auto mx-5 mb-5 mangaPic'>
                    <img className='profilePic' src={profilePic} alt='cover img' />
                    <div className='form-group mt-4'>
                        <label htmlFor="coverImage" className='form-label btn btn-primary'
                        >Cover Image</label>
                    </div>
                </div>
                <div className='col-4 mx-5'>
                    <div className='row my-4'>
                        <div className='col'>
                            <div className='form-group'>
                                <input
                                    type="text"
                                    name='title'
                                    onChange={handleChange}
                                    value={manga.title}
                                    className='form-control'
                                    required
                                />
                                {errors.title && <span className="text-danger">{errors.title.message}</span>}
                            </div>
                        </div>
                        <div className='col'>
                            <div className='form-group'>
                                <input
                                    type="text"
                                    name='author'
                                    onChange={handleChange}
                                    value={manga.author}
                                    className='form-control'
                                    required
                                />
                                {errors.author && <span className="text-danger">{errors.author.message}</span>}
                            </div>
                        </div>
                    </div>
                    <div className='row align-items-center'>
                        <div className='col-3'>
                            <div className='form-group'>
                                <input
                                    type="number"
                                    name='score'
                                    onChange={handleChange}
                                    value={manga.score}
                                    className='form-control'
                                    required
                                    min="1"
                                    max="10"
                                />
                                {errors.score && <span className="text-danger">{errors.score.message}</span>}
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className='form-group'>
                                <input
                                    type="number"
                                    name='volumesCurrentlyOut'
                                    onChange={handleChange}
                                    value={manga.volumesCurrentlyOut}
                                    className='form-control'
                                    required
                                />
                                {errors.volumesCurrentlyOut && 
                                <span className="text-danger">{errors.volumesCurrentlyOut.message}</span>}
                            </div>
                        </div>
                        <div className='col-3 align-items-center'>
                            <div className='form-group'>
                                <select
                                    name="mangaStatus"
                                    id="mangaStatus"
                                    value={manga.mangaStatus}
                                    onChange={handleChange}
                                >
                                    <option value="completed">Completed</option>
                                    <option value="ongoing">Ongoing</option>
                                </select>
                                {errors.mangaStatus && 
                                <span className="text-danger">{errors.mangaStatus.message}</span>}
                            </div>
                        </div>
                    </div>
                    <div className='row mt-4'>
                        <div className='form-group'>
                            <textarea name="synopsis" id="synopsis" cols="30" rows="10" className='form-control' onChange={handleChange} value={manga.synopsis}></textarea>
                            {errors.synopsis && 
                            <span className="text-danger">{errors.synopsis.message}</span>}
                        </div>
                    </div>
                    <div className='align-items-center mt-4'>
                        <button className='btn btn-success'>
                            {currentUser === creator ? 'Edit Manga' : 'Nothing'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default DisplayManga