import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import './styles.css'

const NavbarComponent = () => {
    const [currentUser, setCurrentUser] = useState([]);
    const navigate = useNavigate('');
    const logout = () => {
        axios
            .post('http://localhost:8000/logout')
            .then((res) => {
                console.log(res)
                navigate('/')
            })
            .catch((err) => {
                console.log(err.config)
            })
    }

    useEffect(() => {
        axios
        .get('http://localhost:8000/api/current-user', { withCredentials: true })
            .then((res) => {
                setCurrentUser(res.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [])

    return (
        <Navbar bg="dark" variant='dark'>
            <Container>
                <Navbar.Brand>
                    <h2 className='me-4'>Manga Mania</h2>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <div className='mx-3'>
                            <Link to={`/api/user/${currentUser._id}`}>
                                <Navbar.Text href='/dashboard'>My Page</Navbar.Text>
                            </Link>
                        </div>
                        <div className='mx-3'>
                            <Link to='/dashboard'>
                                <Navbar.Text>Dashboard</Navbar.Text>
                            </Link>
                        </div>
                        <div className='mx-3'>
                            <Link to='/manga'>
                                <Navbar.Text>All Manga</Navbar.Text>
                            </Link>
                        </div>
                        <div className='mx-3'>
                            <Link to='/add/manga'>
                                <Navbar.Text>Add Manga</Navbar.Text>
                            </Link>
                        </div>
                    </Nav>
                </Navbar.Collapse>
                <NavbarCollapse className='justify-content-end'>
                    <Nav className='me-5 align-items-center'>
                        <Navbar.Text className='me-3 '>
                                Signed in as: {currentUser && <span>{currentUser.username}</span>}
                        </Navbar.Text>
                        <Navbar.Text>
                            <button className='btn btn-danger' onClick={logout}>Logout</button>
                        </Navbar.Text>
                    </Nav>
                </NavbarCollapse>
            </Container>
        </Navbar>
    )
}

export default NavbarComponent