import React, { useState, useEffect } from 'react';
import profilePic from './profilePic.png';
import './styles.css';
import NavbarComponent from '../Nav/Nav';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const User = () => {
    const [user, setUser] = useState([]);
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
                {user && <h1 className='my-3 pb-2'>{user.firstName} {user.lastName}</h1> }
            </div>
            <div className='d-flex justify-content-center align-items-center'>
                <div className='col-2 mx-5'>
                    <div className='profilePicContainer d-flex flex-column justify-content-evenly align-items-center'>
                        <div className='mt-5'>
                            <img className='profilePic' src={profilePic} alt='profile pic' />
                        </div>
                        <div>
                            <form>
                                <div className='form-group my-4'>
                                    <label 
                                        htmlFor="image" 
                                        className='form-label'
                                    >Upload profile picture:</label>
                                    <input 
                                        type="file" 
                                        id='image' 
                                        className='form-control' 
                                        accept='image/*'
                                    />
                                </div>
                                <button className='btn btn-primary' type='submit'>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='col-2 mx-5'>
                    <form className='form' onSubmit={submitHandler}>
                        <div className='form-group'>
                            <label htmlFor="firstName" className='form-label'>First Name:</label>
                            <input
                                type="text"
                                name='firstName'
                                className='form-control'
                                onChange={handleChange}
                                placeholder={user.firstName}
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="lastName" className='form-label'>Last Name:</label>
                            <input
                                type="text"
                                name='lastName'
                                className='form-control'
                                onChange={handleChange}
                                placeholder={user.lastName}
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="email" className='form-label'>Email:</label>
                            <input
                                type="email"
                                name='email'
                                className='form-control'
                                onChange={handleChange}
                                placeholder={user.email}
                                required
                            />
                        </div>
                        <button className='btn btn-success mt-4'>Edit</button>
                    </form>
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

export default User