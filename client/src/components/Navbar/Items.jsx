import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {
  return (
    <nav className="z-50 sticky top-0 px-4 py-2 md:py-3 lg:py-4">
      <ul className="flex space-x-8">
        <li className="group"> 
          <Link to={props.link}>
          <span className="relative text-black text-lg font-medium transition-all duration-500 ease-in-out hover:cursor-pointer">
            {props.title}
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-500 ease-in-out group-hover:w-full "></span>
          </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
