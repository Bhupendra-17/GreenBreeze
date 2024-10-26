import React from 'react';
import AqiDisplay from './Aqi';

function Temp() {
    return (
        <div className='relative min-h-screen bg-[url("https://miro.medium.com/v2/resize:fit:1400/0*iWTgGBIPGJg5PsfO.jpg")] bg-cover bg-center bg-fixed'>
            {/* Add backdrop blur and make sure it covers full height */}
            <div className='relative bg-black/40 backdrop-blur-sm py-12 px-12 min-h-screen'>
                <div className='bg-stone-100 rounded-xl w-5/6 sm:w-2/3 md:w-2/3 lg:w-2/3 py-3 px-2 shadow-lg mx-auto'>
                    <AqiDisplay />
                </div>
            </div>
        </div>
    );
}

export default Temp;
