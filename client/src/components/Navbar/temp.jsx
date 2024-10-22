import React from 'react';
import Items from './Items';

function Navbar() {
    return (
        <div className='fixed top-0 left-0 z-50 shadow-md text-xl w-full bg-white'>
            <div className='flex justify-end lg:mr-10'>
                <Items title="Home" link="/home" />
                <Items title="Knowledge Hub" link="/knowledge" />
            </div>
        </div>
    );
}

export default Navbar;
