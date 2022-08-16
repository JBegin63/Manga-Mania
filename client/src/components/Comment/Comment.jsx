import React, { useState, useEffect } from 'react';
import './styles.css';
import axios from 'axios';

const Comment = () => {
    const [currentUser, setCurrentUser] = useState([]);
    const [manga, setManga] = useState([]);
    const [errors, setErrors] = useState([]);
    const [comment, setComment] = useState({
        description: '',
        taggedManga: '',
});

    const handleChange = (e) => {
        setComment({
            ...comment,
            [e.target.name]: e.target.value,
        });
    };

    // Getting current user
    useEffect(() => {
        axios
        .get('http://localhost:8000/api/current-user', { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                setCurrentUser(res.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [setCurrentUser])

    // Getting all manga
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

    // Submit handler for comment
    const submitHandler = () => {
        axios
            .post('http://localhost:8000/api/comment', comment, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err.response.data);
                setErrors(err.response.data);
            })
    }

    return (
        <div className='commentContainer'>
            <form className='d-flex flex-direction-row flex-column flex-wrap align-items-stretch' onSubmit={submitHandler}>
                <div className='d-flex align-items-center'>
                    <div className='profilePicContainerComment'>
                        <img src={currentUser.profilePic} className='img-thumbnail rounded-circle' alt="profile pic" />
                    </div>
                    <div className='textContainer flex-grow-1'>
                        <textarea name="description" id="comment" cols="60" rows="5" placeholder='Comment here...' onChange={handleChange} required></textarea>
                        {errors.description && <span className="text-danger">{errors.description.message}</span>}
                    </div>
                </div>
                <div className='d-flex align-items-center justify-content-end align-items-center'>
                    <div className='me-2'>
                        <select name="taggedManga" id="taggedManga" onChange={handleChange}>
                            <option value="">Tag A Manga</option>
                            {manga.map((manga) => (
                                <option key={manga._id} value={manga._id}>{manga.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className='me-2'>
                        <button className='btn btn-success'>Post</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Comment