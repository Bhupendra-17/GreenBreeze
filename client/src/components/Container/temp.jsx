import React, { useState, useEffect, useRef } from 'react';
import Content2 from './temp3';
import Content from './temp2';
import Desc from './desc';

function Temp() {
  const [isDescVisible, setIsDescVisible] = useState(false);
  const descRef = useRef(null);

  // Set up intersection observer for the Desc component
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsDescVisible(true);
            observer.unobserve(entry.target); // Stop observing once it’s visible
          }
        });
      },
      { threshold: 0.2 }
    );

    if (descRef.current) {
      observer.observe(descRef.current);
    }

    return () => {
      if (descRef.current) observer.unobserve(descRef.current);
    };
  }, []);

  return (
    <div>
      {/* Fixed background section */}
      <div className='relative bg-[url("https://miro.medium.com/v2/resize:fit:1400/0*iWTgGBIPGJg5PsfO.jpg")] bg-cover bg-center h-screen bg-fixed'>
        <div className='absolute inset-0 bg-black/20 backdrop-blur-sm flex justify-center'>
          <div className='text-center text-white pt-24'>
            <Content />
            <Content2 />
          </div>
        </div>
      </div>

      {/* Desc section with scroll animation */}
      <div
        ref={descRef}
        className={`transition-opacity duration-1000 ease-in-out text-gray-800 py-8 mt-5 ${
          isDescVisible ? 'opacity-90' : 'opacity-0'
        }`}
      >
        <Desc />
      </div>
    </div>
  );
}

export default Temp;
