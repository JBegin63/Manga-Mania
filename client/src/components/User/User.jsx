import React, { useState, useEffect } from 'react';
import profilePic from './profilePic.png';
import './styles.css';
import Header from '../Header/Header';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const User = () => {
    const [currentUser, setCurrentUser] = useState([]);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const { id } = useParams('');
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        profilePic: '',
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    // Get user profile by id
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

    // Getting current user
    useEffect(() => {
        axios
        .get('http://localhost:8000/api/current-user', { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                setCurrentUser(res.data._id);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [setCurrentUser])

    // Submit button for editing profile 
    const submitHandler = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:8000/api/user/${currentUser}`, { withCredentials: true })
            .then((res) => {
                console.log(res);
                navigate('/dashboard')
            })
            .catch((err) => {
                console.log(err.response);
            })
    }

    if (currentUser === id) {
        return (
            <div className='profile-container'>
                <Header />
                <div className='row'>
                    <h1 className='my-4'>{user.username}'s Profile Page</h1>
                </div>
                <form className='form d-flex justify-content-center mt-2' onSubmit={submitHandler}>
                    <div className='col-auto mx-5 mb-5 profilePicContainer'>
                        <img className='profilePic' src={user.profilePic} alt='profile pic' />
                        <div className='form-group mt-4'>
                            <input 
                                type="text"
                                id='profilePic'
                                name='profilePic'
                                className='form-control'
                                onChange={handleChange}
                                value={user.profilePic}
                                placeholder='      Upload Profile Pic'
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
    } else {
        return (
            <div className='profile-container'>
                <Header />
                <div className='row'>
                    <h1 className='my-4'>{user.username}'s Profile Page</h1>
                </div>
                <div className='d-flex justify-content-center mt-2' onSubmit={submitHandler}>
                    <div className='col-auto mx-5 mb-5 profilePicContainer'>
                        <img className='profilePic' src={profilePic} alt='profile pic' />
                    </div>
                    <div className='col-auto mx-5'>
                        <div className='d-flex align-items-center'>
                            <h3 className='mx-3'>First Name: </h3>
                            <h3>{user.firstName}</h3>
                        </div>
                        <div className='d-flex align-items-center'>
                            <h3 className='mx-3'>Last Name: </h3>
                            <h3>{user.lastName}</h3>
                        </div>
                        <div className='d-flex align-items-center'>
                            <h3 className='mx-3'>Username: </h3>
                            <h3>{user.username}</h3>
                        </div>
                    </div>
                </div>
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
}

export default User