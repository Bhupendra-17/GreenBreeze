import React from 'react';

function Footer() {
  return (
    <footer className="bg-green-800 text-white py-4">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center md:items-center">
        {/* Logo and Brief Description */}
        <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
          <h1 classNam
          e="text-xl md:text-2xl font-bold">GreenBreeze 🍃</h1>
          <p className="mt-1 text-center md:text-left text-xs md:text-sm max-w-xs md:max-w-sm">
            Empowering a sustainable future with real-time AQI insights. Join us in our journey for cleaner air and greener surroundings.
          </p>
        </div>

        {/* Contact Information */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-base md:text-lg font-semibold mb-1">Contact Us</h2>
          <p className="text-xs md:text-sm">Phone: +91 797439XXXX</p>
          <p className="text-xs md:text-sm">Email: support@greenbreeze.org</p>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="container mx-auto mt-4 flex justify-center space-x-4">
        <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 text-xs md:text-sm">Facebook</a>
        <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 text-xs md:text-sm">Twitter</a>
        <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 text-xs md:text-sm">Instagram</a>
      </div>

      {/* Disclaimer */}
      <p className="text-center text-xs md:text-sm text-green-200 mt-2">
        Note: This information may not be entirely accurate and is subject to change.
      </p>
    </footer>
  );
}

export default Footer;
