import React from 'react'
import AqiDisplay from './Aqi'
function temp() {
    return (
        <div className='relative bg-[url("https://miro.medium.com/v2/resize:fit:1400/0*iWTgGBIPGJg5PsfO.jpg")] bg-cover bg-center h-screen'>
            {/* Add backdrop blur */}
            <div className='absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center'>
                <div className='bg-white rounded-xl py-4 px-6'>
                    <AqiDisplay/>
                </div>
            </div>
        </div>
    )
}

export default temp