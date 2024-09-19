import React, { useState } from "react";

function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section
      className="relative flex flex-col items-center justify-center px-6 pt-20 pb-40 w-full min-h-[700px] font-medium text-center bg-cover bg-no-repeat bg-center max-md:px-5 max-md:pb-24 max-md:min-h-[500px]"
      style={{
        backgroundImage: `url("https://cdn.builder.io/api/v1/image/assets/TEMP/ba0e94e5732e9db198cee2b9b48d4f45a867c080c587afab435fdd8cf0aa661c?placeholderIfAbsent=true&apiKey=32ea7a6332e74b77babd6d1104c25fd5")`,
      }}
    >
      <h1 className="relative text-6xl font-bold text-slate-800 leading-tight max-w-4xl max-md:text-4xl max-md:max-w-full">
        EMPOWERING TECHNOLOGY FOR THE FUTURE
      </h1>
      <p className="relative mt-6 text-lg leading-relaxed text-slate-600 max-w-2xl max-md:text-base max-md:max-w-full">
        At Nokia, we shape the technologies that connect the world and drive
        innovation for a more connected tomorrow.
      </p>
      <a
        href="#work"
        onClick={openModal}
        className="relative inline-block px-10 py-4 mt-8 text-lg font-semibold text-white bg-slate-800 rounded-md hover:bg-slate-900 transition-all max-md:px-6 max-md:py-3 cursor-pointer"
      >
        See Our Work
      </a>

      {/* Modal for YouTube Video */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
          onClick={closeModal}
        >
          <div className="relative bg-white p-8 rounded-lg max-w-3xl w-full max-md:p-4" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-2 right-2 text-2xl text-gray-600 hover:text-black"
              onClick={closeModal}
            >
              &times;
            </button>
            <div className="relative w-full h-0 pb-[56.25%]"> {/* Aspect ratio for YouTube video */}
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/rZkzFMzngX4"
                title="YouTube Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Hero;
