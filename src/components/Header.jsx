import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Header() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  // Open the "About Us" popup
  const openAboutPopup = () => {
    setIsAboutOpen(true);
  };

  // Open the "Contact" popup
  const openContactPopup = () => {
    setIsContactOpen(true);
  };

  // Close all popups
  const closePopup = () => {
    setIsAboutOpen(false);
    setIsContactOpen(false);
  };

  // Navigate to /login when the login button is clicked
  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <header className="flex z-10 flex-wrap gap-5 justify-between items-center px-20 py-4 w-full text-base font-medium text-white bg-slate-800 max-md:px-5 max-md:max-w-full">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/53d899b792f49370af199568fd37761cf16345c88a6b93476139d1350ff61128?placeholderIfAbsent=true&apiKey=32ea7a6332e74b77babd6d1104c25fd5"
        alt="Company logo"
        className="object-contain shrink-0 self-stretch my-auto max-w-full aspect-[3.65] w-[117px]"
      />
      <nav className="flex gap-9 self-stretch my-auto leading-none text-center">
        <a href="#home">Home</a>
        <a href="#about" onClick={openAboutPopup}>About Us</a>
        <a href="#contact" onClick={openContactPopup}>Contact</a>
      </nav>
      <button
        className="self-stretch px-12 py-2.5 whitespace-nowrap rounded-md bg-slate-500 max-md:px-5"
        onClick={handleLoginClick} // Add the click handler
      >
        LOGIN
      </button>

      {/* About Us Popup */}
      {isAboutOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
          onClick={closePopup}
        >
          <div className="relative bg-white p-8 rounded-lg max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-2 right-2 text-2xl text-gray-600 hover:text-black"
              onClick={closePopup}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">About Nokia</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              Nokia has over 150 years of experience, having been founded in 1865,
              evolving from a paper mill to a global leader in telecommunications and
              technology.
            </p>
            <a
              href="https://en.wikipedia.org/wiki/History_of_Nokia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Learn more on Wikipedia
            </a>
          </div>
        </div>
      )}

      {/* Contact Us Popup */}
      {isContactOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
          onClick={closePopup}
        >
          <div className="relative bg-white p-8 rounded-lg max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-2 right-2 text-2xl text-gray-600 hover:text-black"
              onClick={closePopup}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Contact Us</h2>
            <p className="text-base leading-relaxed text-slate-600 mb-4">
              Phone: +1 800 123 4567 <br />
              Email: contact@nokia.com
            </p>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
