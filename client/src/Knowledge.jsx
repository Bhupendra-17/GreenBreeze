import React from 'react';
import AirPollutionMeasures from './components/Cards/AirPollutionsMeasures';

const Knowledge = () => {
  return (
    <div className='relative min-h-screen bg-[url("https://miro.medium.com/v2/resize:fit:1400/0*iWTgGBIPGJg5PsfO.jpg")] bg-cover bg-center bg-fixed'>
            {/* Add backdrop blur and make sure it covers full height */}
            <div className='relative bg-black/40 backdrop-blur-sm py-12 px-12 min-h-screen'>
                <div className='bg-stone-100 rounded-xl my-6 px-2 shadow-lg mx-auto'>
                    <AirPollutionMeasures />
                </div>
            </div>
        </div>
  );
};

export default Knowledge;