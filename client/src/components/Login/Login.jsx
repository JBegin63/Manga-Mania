import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

const Login = ({ setIsLoggedin }) => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit= (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/login', user, { withCredentials: true }) 
            .then((res) => {
                console.log(res.data.user);
                setIsLoggedin(true);
                navigate('/dashboard')
            })
            .catch((err) => {
                console.log(err.response.data);
                setErrors(err.response.data);
            });
    };

    return (
        <div className='container'>
            <h1 className='my-5'>Manga Mania</h1>
            <div className='d-flex justify-content-around'>
                <div className='loginStyle col-4'>
                    <form className='loginFormStyle' onSubmit={handleSubmit}>
                        <h2>Login</h2>
                        <div className='align-items-center py-2'>
                            <div className='align-items-center py-3'>
                                <div className='col-auto'>
                                    <input 
                                        type="email"
                                        placeholder='Email'
                                        name='email'
                                        id='email'
                                        autoComplete='off'
                                        onChange={handleChange}
                                        value={user.email}
                                        required
                                        className='form-control'
                                    />
                                    {errors.error && <span className="text-danger">{errors.error}</span>}
                                </div>
                            </div>
                        </div>
                        <div className='align-items-center py-2'>
                            <div className='align-items-center'>
                                <div className='col-auto'>
                                    <input 
                                        type="password"
                                        placeholder='Password'
                                        name='password'
                                        id='password'
                                        autoComplete='off'
                                        onChange={handleChange}
                                        value={user.password}
                                        required
                                        className='form-control'
                                    />
                                    {errors.error && <span className="text-danger">{errors.error}</span>}
                                </div>
                            </div>
                        </div>
                        <button className='btn btn-primary my-3'>Login</button>
                    </form>
                    <div className='loginFormStyle mt-3'>
                        <h5>Don't have an account yet?</h5>
                        <Link to='/register' style={{ textDecoration: "none" }}>
                            <button className='btn btn-success'>Register Here</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login