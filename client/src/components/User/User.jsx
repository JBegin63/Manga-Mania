import React, { useState, useEffect } from 'react';
import profilePic from './profilePic.png';
import './styles.css';
import NavbarComponent from '../Nav/Nav';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const User = () => {
    const [user, setUser] = useState(null);
    const { id } = useParams('');

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

    return (
        <div className='profile-container'>
            <NavbarComponent />
            <div className='row'>
                {user && <h1 className='my-3 pb-2'>{user.firstName} {user.lastName}</h1> }
            </div>
                <div className='d-flex justify-content-evenly'>
                    <div className='col-2'>
                        <div className='profilePicContainer d-flex flex-column justify-content-evenly align-items-center'>
                            <div>
                                <img className='profilePic' src={profilePic} alt='profile pic' />
                            </div>
                            <div>
                                <form className=''>
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
                    <div className='col-9'>

                    </div>
            </div>
        </div>
    )
}

export default User