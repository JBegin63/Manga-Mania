import React, { useState } from 'react';
import Nav from '../Nav/Nav';

const MangaList = () => {
    const [isLoggedin, setIsloggedin] = useState(false);
    return (
        <div className='container'>
            <h1 className='my-5 pb-2'>All Manga</h1>
            <div className='d-flex justify-content-between'>
                <div className='col-2'>
                    <Nav isLoggedin={isLoggedin} setIsloggedin={setIsloggedin}/>
                </div>
                <div className='col-9'>
                    
                </div>
            </div>
        </div>
    )
}

export default MangaList