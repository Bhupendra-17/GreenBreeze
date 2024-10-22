import React from 'react'
import Content2 from './temp3'
import Content from './temp2'
function temp() {
  return (
    <div className='relative bg-[url("https://miro.medium.com/v2/resize:fit:1400/0*iWTgGBIPGJg5PsfO.jpg")] bg-cover bg-center h-screen'>
      {/* Add backdrop blur */}
      <div className='absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center'>
        {/* Your content here */}
        <div className='text-center text-white py-5'>
          <Content />
          <Content2 />
        </div>
      </div>
    </div>
  )
}

export default temp