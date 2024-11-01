import React, { useState, useEffect } from 'react';
import Items from './Items';
import Logo from './logo.jpg';

function Navbar() {
    const [logoLoaded, setLogoLoaded] = useState(false);

    // Trigger animation when logo is loaded
    useEffect(() => {
        setLogoLoaded(true);
    }, []);

    return (
        <div className="fixed flex items-center justify-between w-full top-0 left-0 z-50 shadow-md bg-white text-lg md:text-xl px-4 lg:px-6">
            <div className="flex items-center pl-4">
                <img
                    src={Logo}
                    alt="logo"
                    className={`h-10 md:h-12 rounded-xl transition-transform duration-700 ease-out ${logoLoaded ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
                    onLoad={() => setLogoLoaded(true)}
                />
            </div>
            <div className="flex space-x-4  lg:mr-10">
                <Items title="Home" link="/home" />
                <Items title="Knowledge Hub" link="/knowledge" />
            </div>
        </div>
    );
}

export default Navbar;
