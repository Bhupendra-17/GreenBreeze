import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {
  return (
    <nav className="z-50 sticky top-0 px-4 py-2 md:py-3 lg:py-4">
      <ul className="flex space-x-6 text-center items-baseline">
        <li className="group"> 
          <Link to={props.link}>
          <span className="relative text-black hover:text-green-600 text-lg font-medium transition-all duration-500 ease-in-out hover:cursor-pointer text-center">
            {props.title}
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-green-600 transition-all duration-500 ease-in-out group-hover:w-full "></span>
          </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
