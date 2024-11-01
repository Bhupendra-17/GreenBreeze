import React from 'react';
import AqiDisplay from './Aqi';
import AQI from './AQI_levels.png';

function Temp() {
    return (
        <div className='relative min-h-screen bg-[url("https://miro.medium.com/v2/resize:fit:1400/0*iWTgGBIPGJg5PsfO.jpg")] bg-cover bg-center bg-fixed '>
            {/* Add backdrop blur and make sure it covers full height */}
            <div className='relative bg-black/40 backdrop-blur-sm py-12 px-12 min-h-screen'>
                <div className='bg-[url("https://img.lovepik.com/desgin_photo/45001/5355_list.jpg")]
        bg-cover bg-center rounded-xl  sm:w-2/3 md:w-2/3 lg:w-2/3 pt-9 pb-16 px-2    shadow-lg mx-auto flex  flex-col items-center'>
                    <img src={AQI} alt="aqi meter" className='h-36 sm:h-40 md:h-44 lg:h-44 w-48 sm:w-52 md:w-64 lg:w-72' />
                    <AqiDisplay />
                </div>
            </div>
        </div>
    );
}

export default Temp;
