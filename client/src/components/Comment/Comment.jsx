import React, { useState } from 'react';
import profilePic from './profilePic.png';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Comment = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [comment, setComment] = useState({
        description: ''
    });

    const handleChange = (e) => {
        setComment({
            ...comment,
            [e.target.name]: e.target.value,
        });
    };
    const submitHandler = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8000/api/comment',
                comment.description
            )
            .then((res) => {
                console.log(res.data);
                navigate('/dashboard')
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
                        <img src={profilePic} className='img-thumbnail rounded-circle' alt="profile pic" />
                    </div>
                    <div className='textContainer flex-grow-1'>
                        <textarea name="description" id="comment" cols="60" rows="5" placeholder='Comment here...' onChange={handleChange} required></textarea>
                        {errors.description && <span className="text-danger">{errors.description.message}</span>}
                    </div>
                </div>
                <div className='d-flex align-items-center justify-content-end me-2'>
                    <div className=''>
                        <button className='btn btn-primary me-3'>Edit</button>
                        <button className='btn btn-success'>Post</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Comment