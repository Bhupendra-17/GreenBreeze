import React, { useEffect, useRef, useState } from 'react';

const MeasuresCard = ({ title, description, icon, index }) => {
  const [isVisible, setIsVisible] = useState(false); // for scroll animation
  const [isExpanded, setIsExpanded] = useState(false); // for "Show more" toggle
  const cardRef = useRef(null);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // Stop observing once the element is visible
          }
        });
      },
      { threshold: 0.4 } 
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`flex flex-col lg:flex-row items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} 
         shadow-lg rounded-xl p-4 bg-[url("https://img.freepik.com/free-vector/gradient-green-modern-background-designs_343694-2027.jpg?semt=ais_hybrid")]
        bg-cover bg-center
        transform transition-transform duration-700 ease-out 
        ${isVisible ? 'translate-x-0 opacity-100' : isEven ? '-translate-x-32 opacity-0' : 'translate-x-32 opacity-0'}`}
        
    >
      <img 
        src={icon} 
        alt={`${title} icon`} 
        className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 rounded-xl" 
      />
      <div className={`flex-1 py-4 px-2 ${isEven ? 'text-left' : 'text-right'}`}>
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-white mb-2 text-center">
          {title}
        </h3>
        <p className={`text-sm sm:text-base lg:text-lg text-sky-100 w-full px-2 text-justify ${!isExpanded ? 'line-clamp-3 sm:line-clamp-4 lg:line-clamp-none' : ''}`}>
          {description}
        </p>
        {/* Button only visible on small and medium screens */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-800 text-sm float-left font-semibold mt-2 ml-2 lg:hidden"
        >
          {isExpanded ? 'Show less' : 'Show more'}
        </button>
      </div>
    </div>
  );
};

export default MeasuresCard;
