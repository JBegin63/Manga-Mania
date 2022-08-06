import React, { useState, useEffect } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Comment from '../Comment/Comment';
import Header from '../Header/Header';

const Dashboard = () => {
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
            <Header />
            <div className='row'>
                <h1 className='my-3 pb-3'>Home</h1>
            </div>
            <div className='d-flex justify-content-center'>
                <div className='col-2'>
                    <h2>Other Users</h2>
                    {users.map((user) => (
                        <div key={user._id}>
                            <Link to={`/api/user/${user._id}`}>
                                <p style={{ fontSize: "24px"}}>{user.username}</p>
                            </Link>
                        </div>
                    ))}
                </div>
                <div className='col-6 allComments me-5'>
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
                        <div key={comment._id} className='my-4'>
                            <p style={{ fontSize: "24px"}}>{comment.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard