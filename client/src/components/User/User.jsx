import React, { useState, useEffect } from 'react';
import profilePic from './profilePic.png';
import './styles.css';
import NavbarComponent from '../Nav/Nav';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const User = () => {
    const [user, setUser] = useState([]);
    const [errors, setErrors] = useState({});
    const { id } = useParams('');
    const [editUser, setEditUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });

    const handleChange = (e) => {
        setEditUser({
            ...editUser,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        axios
        .get(`http://localhost:8000/api/user/${id}`, { withCredentials: true })
            .then((res) => {
                console.log(res.data[0]);
                setUser(res.data[0]);
            })
            .catch((err) => {
                console.log(err.response);
                setErrors(err.response);
            });
    }, [id])

    const submitHandler = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:8000/api/user/${id}`, { withCredentials: true })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err.response);
            })
    }

    return (
        <div className='profile-container'>
            <NavbarComponent />
            <div className='row'>
                <h1 className='my-4'>Profile Page</h1>
            </div>
            <form className='form d-flex justify-content-center mt-2' onSubmit={submitHandler}>
                <div className='col-auto mx-5 mb-5 profilePicContainer'>
                    <img className='profilePic' src={profilePic} alt='profile pic' />
                    <div className='form-group mt-4'>
                        <label htmlFor="profilePic" className='form-label btn btn-primary'
                        >Upload Profile Pic</label>
                        <input 
                            type="file"
                            id='profilePic'
                            className='form-control'
                            name='profilePic'
                            onChange={handleChange}
                            accept='image/*'
                            value={user.profilePic}
                            style={{ display: 'none '}}
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
                                    value={user.firstName}
                                    className='form-control'
                                    onChange={handleChange}
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
                                    value={user.lastName}
                                    className='form-control'
                                    onChange={handleChange}
                                    required
                                />
                                {errors.author && <span className="text-danger">{errors.author.message}</span>}
                            </div>
                        </div>
                    </div>
                    <div className='row align-items-center'>
                        <div className='form-group'>
                            <input
                                type="text"
                                name='username'
                                value={user.username}
                                className='form-control'
                                onChange={handleChange}
                                required
                            />
                            {errors.score && <span className="text-danger">{errors.score.message}</span>}
                        </div>
                    </div>
                    <div className='row align-items-center my-4'>
                        <div className='form-group'>
                            <input
                                type="email"
                                name='email'
                                value={user.email}
                                className='form-control'
                                onChange={handleChange}
                                required
                            />
                            {errors.score && <span className="text-danger">{errors.score.message}</span>}
                        </div>
                    </div>
                    <div className='align-items-center mt-4'>
                        <button className='btn btn-success'>Submit</button>
                    </div>
                </div>
            </form>
            <div className='row mt-5'>
                <h2 className='mb-5'>Favorited Manga</h2>
                <div className='d-flex justify-content-evenly align-items-center'>
                    <div>
                        <div>
                            <img className='profilePic' src={profilePic} alt='profile pic' />
                        </div>
                    </div>
                    <div>
                        <div>
                            <img className='profilePic' src={profilePic} alt='profile pic' />
                        </div>
                    </div>
                    <div>
                        <div>
                            <img className='profilePic' src={profilePic} alt='profile pic' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User