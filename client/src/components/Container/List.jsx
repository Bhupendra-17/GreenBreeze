import React from 'react'

function List() {
    return (
        <div
            className={`flex flex-col gap-2 items-center pb-4 transform 
            ${animate ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} 
            transition-all duration-1000 ease-out`}
        >
            <ul className='list-disc w-fit text-left text-white'>
                <li>Know the Air Quality</li>
                <li>Get the Required area</li>
                <li>Get recommendations </li>
                <li>Start the work.</li>
            </ul>
        </div>
    )
}

export default List