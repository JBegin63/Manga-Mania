import React, { useState, useEffect } from 'react';
import './styles.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Comment from '../Comment/Comment';
import Header from '../Header/Header';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [comment, setComment] = useState([]);
    const [manga, setManga] = useState([]);
    const navigate = useNavigate();

    // Getting all users
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

    // Getting all comments
    useEffect(() => {
        axios
            .get('http://localhost:8000/api/comments')
            .then((res) => {
                console.log(res.data);
                setComment(res.data);
                setManga(res.data.taggedManga)
            })
            .catch((err) => {
                console.log('Failed to load comments', err)
            })
    }, [])

    // Submit handler for comment
    const deleteHandler = (id) => {
        axios
            .delete(`http://localhost:8000/api/comment/${id}`, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                navigate('/dashboard')
            })
            .catch((err) => {
                console.log(err.response.data);
            })
    }

    // Submit handler for liking
    const likeHandler = () => {
        axios
            .put(`http://localhost:8000/api/comment/${comment._id}`, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                navigate('/dashboard')
            })
            .catch((err) => {
                console.log(err.response.data);
            })
    }

    // Submit handler for disliking
    const dislikeHandler = () => {
        axios
            .put(`http://localhost:8000/api/comment/${comment._id}`, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                navigate('/dashboard')
            })
            .catch((err) => {
                console.log(err.response.data);
            })
    }

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
                    {comment.map((comment) => (
                        <div key={comment._id} className='d-flex flex-direction-row flex-column flex-wrap align-items-stretch my-4 commentContainer'>
                            <div className='d-flex align-items-center'>
                                <div className='profilePicContainerComment align-items-center'>
                                    <img src={comment.createdBy.profilePic} className='img-thumbnail rounded-circle mt-2' alt="profile pic" />
                                    <p style={{ fontSize: "24px"}}>{comment.createdBy.username}</p>
                                </div>
                                <div className='textContainer flex-grow-1'>
                                    <textarea name="description" id="comment" cols="60" rows="5" style={{ fontSize: "20px"}} value={comment.description} readOnly></textarea>
                                </div>
                            </div>
                            <div className='d-flex justify-content-end'>
                                <div>
                                    <Link to={`http://localhost:8000/api/manga/${manga}`}>
                                        {comment.taggedManga && <span>Tagged manga: {comment.taggedManga.title }</span>}
                                    </Link>
                                </div>
                                <div>
                                    <button className='btn btn-primary' onClick={likeHandler}>Likes: {comment.likeCount}</button>
                                </div>
                                <div className='mx-2'>
                                    <button className='btn btn-warning' onClick={dislikeHandler}>Dislikes: {comment.dislikeCount}</button>
                                </div>
                                <div className='me-2'>
                                    <button className='btn btn-danger' onClick={deleteHandler}>Delete</button>
                                </div>
                                <div className='me-2'>
                                    <button className='btn btn-dark'>Reply</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard