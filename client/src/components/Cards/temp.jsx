import React, { useEffect, useRef, useState } from 'react';

const MeasuresCard = ({ title, description, icon, index }) => {
  const [isVisible, setIsVisible] = useState(false); // for scroll animation
  const [isExpanded, setIsExpanded] = useState(false); // for "Show more" toggle
  const cardRef = useRef(null);
  const isEven = index % 2 === 0;
  const shortDescription = description.slice(0, 100) + (description.length > 100 ? '...' : '');

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
      className={`flex lg:flex-row items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} 
        bg-white shadow-lg rounded-lg p-4 
        transform transition-transform duration-700 ease-out 
        ${isVisible ? 'translate-x-0 opacity-100' : isEven ? '-translate-x-32 opacity-0' : 'translate-x-32 opacity-0'}`}
    >
      <img 
        src={icon} 
        alt={`${title} icon`} 
        className="w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 mb-4 lg:mb-0" 
      />
      <div className={`flex-1 p-4 ${isEven ? 'text-left' : 'text-right'}`}>
        <h3 className="text-xl font-semibold text-green-600 mb-2 text-center">{title}</h3>
        <p className="text-gray-700 w-full px-4 text-justify">
          {isExpanded ? description : shortDescription}
        </p>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-800  font-semibold mt-2 ml-4"
        >
          {isExpanded ? 'Show less' : 'Show more'}
        </button>
      </div>
    </div>
  );
};

export default MeasuresCard;
