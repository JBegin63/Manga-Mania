import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import Comment from '../Comment/Comment';
import './styles.css'

const DisplayManga = () => {
    const [errors, setErrors] = useState({});
    const [comment, setComment] = useState([]);
    const { id } = useParams('');
    const [manga, setManga] = useState({
        title: '',
        author: '',
        score: '',
        volumesCurrentlyOut: '',
        mangaStatus: '',
        synopsis: '',
        coverImage: '',
        likes: '',
    });

    const handleChange = (e) => {
        setManga({
            ...manga,
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
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [id])

    // Getting comments for manga 
    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/mangaByComment/${id}`, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                setComment(res.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [id])
    
    // Submit button for editing manga
    const submitHandler = (e) => {
        axios
            .put(`http://localhost:8000/api/manga/${id}`, manga, { withCredentials: true })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err.response.data);
                setErrors(err.response.data);
            })
    }

    // Like manga button 
    const likeMangaHandler = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:8000/api/manga/like/${id}`, {}, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err.response.data);
                setErrors(err.response.data);
            })
        axios
            .put(`http://localhost:8000/api/user/like/${id}`, {} ,{ withCredentials: true })
            .then((res) => {
                console.log(manga._id);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err.response);
                setErrors(err.response.data);
            })
    }

    // Dislike manga button 
    const dislikeMangaHandler = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:8000/api/manga/unlike/${id}`, {}, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err.response.data);
                setErrors(err.response.data);
            })
        axios
            .put(`http://localhost:8000/api/user/unlike/${id}`, {} ,{ withCredentials: true })
            .then((res) => {
                console.log(manga._id);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err.response);
                setErrors(err.response.data);
            })
    }

    // Delete comment
    const deleteCommentHandler = (idFromBelow) => {
        axios
            .delete(`http://localhost:8000/api/comment/${idFromBelow}`, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                const filteredComments = comment.filter(comment => {
                    return comment._id !== idFromBelow
                });
                setComment(filteredComments);
            })
            .catch((err) => {
                console.log(err.response.data);
            })
    }

    return (
        <div className='mangaPic-container'>
            <Header />
            <div className='row'>
                <h1 className='my-4'>{manga.title}</h1>
                <div className='d-flex justify-content-center align-items-center'>
                    <div>
                        <button className='btn btn-primary mx-1' onClick={likeMangaHandler}>Like</button>
                    </div>
                    <div>
                        <button className='btn btn-danger mx-1' onClick={dislikeMangaHandler}>Unlike</button>
                    </div>
                </div>
            </div>
            <div className='row'>
                <form className='form d-flex justify-content-center align-items-center' onSubmit={submitHandler}>
                    <div className='col-auto mx-5 mb-5 mangaPic'>
                        <img className='mangaCoverImage' src={manga.coverImage} alt='cover img' />
                        <div className='form-group mt-4'>
                            <label htmlFor="coverImage" className='form-label'>Cover Image Link</label>
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
                                        <option value="">Manga Status</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Ongoing">Ongoing</option>
                                        <option value="On Hiatus">On Hiatus</option>
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
                            <button className='btn btn-success'>Edit Manga</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className='row'>
                <div className='w-50 mx-auto'>
                    <Comment />
                    {comment.map((comment) => (
                        <div key={comment._id} className='d-flex flex-direction-row flex-column flex-wrap align-items-stretch my-4 commentContainer '>
                            <div className='d-flex align-items-center'>
                                <div className='profilePicContainerComment align-items-center'>
                                    <img src={comment.createdBy.profilePic} className='img-thumbnail rounded-circle mt-2' alt="profile pic" />
                                    <p style={{ fontSize: "24px"}}>{comment.createdBy.username}</p>
                                </div>
                                <div className='textContainer flex-grow-1'>
                                    <textarea name="description" id="comment" cols="60" rows="5" style={{ fontSize: "20px"}} value={comment.description} readOnly></textarea>
                                </div>
                            </div>
                            <div className='d-flex justify-content-end'>
                                <div className='me-2'>
                                    <button className='btn btn-danger' onClick={() => deleteCommentHandler(comment._id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DisplayManga