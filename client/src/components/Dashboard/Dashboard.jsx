import React, { useState, useEffect } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavbarComponent from '../Nav/Nav';
import Comment from '../Comment/Comment'

const Dashboard = () => {
    const [isLoggedin, setIsloggedin] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/users')
            .then((res) => {
                console.log(res.data);
                setUsers(res.data);
            })
            .catch((err) => {
                console.log('Failed to load users', err)
            })
    }, [])

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
    }, [isLoggedin])

    useEffect(() => {
        axios
        .get('http://localhost:8000/api/comments')
        .then((res) => {
            console.log(res.data);
            setComments(res.data);
        })
        .catch((err) => {
            console.log('Failed to load comments', err)
        })
    }, [])

    return (
        <div className='dashboard-container'>
            <NavbarComponent isLoggedin={isLoggedin} setIsloggedin={setIsloggedin} />
            <div className='row'>
                <h1 className='my-3 pb-2'>Dashboard</h1>
            </div>
            <div className='d-flex justify-content-evenly'>
                <div className='col-2 me-5'>
                    <h2>Other Users</h2>
                    {users.map((user) => (
                        <div key={user._id}>
                            <Link to={`/api/user/${users._id}`}>
                                <p style={{ fontSize: "24px"}}>{user.firstName} {user.lastName}</p>
                            </Link>
                        </div>
                    ))}
                </div>
                <div className='col-8 allComments'>
                    <div className='d-flex justify-content-between p-2'>
                        <h2>Timeline</h2>
                        <form>
                            <select name="filter" id="filter">
                                <option value="">All</option>
                                <option value="">Favorited</option>
                            </select>
                        </form>
                    </div>
                    <Comment />
                    {comments.map((comment) => (
                        <div key={comment._id}>
                            <p style={{ fontSize: "24px"}}>{comment.description}</p>
                        </div>
                    ))}
                </div>
                
            </div>
        </div>
    )
}

export default Dashboard