import React from "react";

const locations = [
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/82dae7059f2f1a8f023d33339814f522e9794c7bcac6339dc74504cbc3b1d77d?placeholderIfAbsent=true&apiKey=32ea7a6332e74b77babd6d1104c25fd5",
    title: "Nokia Finland (Headquarters)",
    description:
      "Located in Espoo, Finland, the headquarters focuses on corporate strategy, R&D, and global operations.",
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/5a1cf346499c30fa83ea5a8aa2a39a8611f012027b1bc34cf55249b694115083?placeholderIfAbsent=true&apiKey=32ea7a6332e74b77babd6d1104c25fd5",
    title: "Nokia USA",
    description:
      "Primarily based in Texas and New Jersey, it focuses on network infrastructure, 5G deployment.",
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/4d4b5b35a182e66eafe48682caad27422867b8ea3c8fb656b84a3e15c2358b90?placeholderIfAbsent=true&apiKey=32ea7a6332e74b77babd6d1104c25fd5",
    title: "Nokia India",
    description:
      "A major R&D hub located in Bengaluru, focusing on 5G technologies, network solutions, and local telecom support.",
  },
];

function Locations() {
  return (
    <section className="mt-36 mx-auto px-10 max-md:mt-10 max-md:px-5 max-md:max-w-full">
      <div className="flex gap-10 justify-between max-md:flex-col max-md:gap-5">
        {locations.map((location, index) => (
          <div
            key={index}
            className="flex flex-col w-[30%] max-md:w-full"
          >
            <div className="flex flex-col grow max-md:mt-10">
              <img
                loading="lazy"
                src={location.image}
                alt={location.title}
                className="object-contain w-full aspect-[0.94] shadow-lg"
              />
              <h3 className="mt-5 text-2xl font-semibold text-slate-800">
                {location.title}
              </h3>
              <p className="mt-5 text-base leading-7 text-neutral-400">
                {location.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Locations;
