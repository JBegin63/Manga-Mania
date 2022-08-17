import React, { useState, useEffect } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Comment from '../Comment/Comment';
import Header from '../Header/Header';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [comment, setComment] = useState([]);

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
            })
            .catch((err) => {
                console.log('Failed to load comments', err)
            })
    }, [])

    // Getting tagged manga of comments
    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/comments/${comment.taggedManga}`)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log('Failed to load comments', err)
            })
    }, [comment.taggedManga])

    // Submit handler for comment
    const deleteCommentHandler = (idFromBelow) => {
        axios
            .delete(`http://localhost:8000/api/comment/${idFromBelow}`, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                const filteredComments = comment.filter(comment => {
                    return comment._id !== idFromBelow
                });
                setComment(filteredComments);
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
                    <div className='d-flex p-2'>
                        <h2>Timeline</h2>
                    </div>
                    <Comment />
                    {comment.map((comment) => (
                        <div key={comment._id} className='d-flex flex-direction-row flex-column flex-wrap align-items-stretch my-4 commentContainer'>
                            <div className='d-flex align-items-center'>
                                <div className='profilePicContainerComment align-items-center'>
                                    <img src={comment.createdBy.profilePic} className='img-thumbnail rounded-circle mt-2' alt="profile pic" />
                                    <Link to={`/api/user/${comment.createdBy._id}`}>
                                        <p style={{ fontSize: "24px"}}>{comment.createdBy.username}</p>
                                    </Link>
                                </div>
                                <div className='textContainer flex-grow-1'>
                                    <textarea name="description" id="comment" cols="60" rows="5" style={{ fontSize: "20px"}} value={comment.description} readOnly></textarea>
                                </div>
                            </div>
                            <div className='d-flex justify-content-end align-items-center'>
                                <div className='align-items-center'>
                                    <Link to={`/manga/${comment.taggedManga._id}`}>
                                        {comment.taggedManga && <span>Tagged Manga: {comment.taggedManga.title }</span>}
                                    </Link>
                                </div>
                                <div className='mx-2'>
                                    <button className='btn btn-danger' onClick={() => deleteCommentHandler(comment._id)}>Delete</button>
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