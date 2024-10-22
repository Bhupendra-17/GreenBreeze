import React, { useState, useEffect } from 'react';

function Header() {
  const [animate, setAnimate] = useState(false);

  // Trigger the animation on component mount
  useEffect(() => {
    setAnimate(true);
  }, []);
  return (
    <div>
      <center>
        <div className={`flex flex-col gap-2 items-center bg-stone-100 p-4 lg:p-6 rounded-2xl mx-3 md:mx-4 pb-4 transform 
      ${animate ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'} 
      transition-all duration-1000 ease-out`}>
          <h1 className="text-4xl font-bold text-green-800 mb-4">GreenBreeze 🍃</h1>
          <h1 className='text-3xl font-semibold text-black'>Green is the Future, Plant for a Healthier Tomorrow</h1>
        </div>
      </center>
    </div>
  );
}

export default Header;
