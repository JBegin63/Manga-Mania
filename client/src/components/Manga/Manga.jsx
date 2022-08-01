import React, { useState } from 'react';
import NavbarComponent from '../Nav/Nav';

const Manga = () => {
    const [isLoggedin, setIsloggedin] = useState(false);
    return (
        <div>
            <NavbarComponent isLoggedin={isLoggedin} setIsloggedin={setIsloggedin} />
        </div>
    )
}

export default Manga