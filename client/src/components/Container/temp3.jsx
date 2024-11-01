import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [animate, setAnimate] = useState(false);

  // Trigger the animation on component mount
  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div>
      <center>
        <div className={`flex flex-col gap-2 items-center p-2 lg:p-6 rounded-2xl mx-3 md:mx-4 pb-4 transform 
          ${animate ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'} 
          transition-all duration-1000 ease-out`}>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">
            Breathe Cleaner, Plant Smarter
          </h1>
          <p className=" text-base md:text-lg lg:text-xl text-center">
            Empowering sustainable development with real-time AQI insights.
          </p>
          <Link to="/home">
            <button className="mt-6 px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 bg-green-500 hover:bg-green-600 text-white rounded-full text-sm md:text-base lg:text-lg transition duration-300">
              Get Started
            </button>
          </Link>
        </div>
      </center>
    </div>
  );
}

export default Header;
