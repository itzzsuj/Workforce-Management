import React from "react";

const clients = [
  {
    name: "Verizon",
    logo: "https://cdn.builder.io/api/v1/image/assets/TEMP/2f600bc9e7876bd0d2e9b7e2675f39c95601df361a0d82773847534ea0775828?placeholderIfAbsent=true&apiKey=32ea7a6332e74b77babd6d1104c25fd5",
  },
  {
    name: "Siemens",
    logo: "https://cdn.builder.io/api/v1/image/assets/TEMP/c0174ebe72786f674d60d34f09ea57c9d9c74ed00ed9de9fd414a44af2ad5914?placeholderIfAbsent=true&apiKey=32ea7a6332e74b77babd6d1104c25fd5",
  },
  {
    name: "Vodafone",
    logo: "https://cdn.builder.io/api/v1/image/assets/TEMP/779c3d5bfd41c46094a24acb62d00c2248cf439bc8a543c734f8ba298085d4eb?placeholderIfAbsent=true&apiKey=32ea7a6332e74b77babd6d1104c25fd5",
  },
  {
    name: "Bosch",
    logo: "https://cdn.builder.io/api/v1/image/assets/TEMP/4174ded5e5c2e54466b5f593aea8c7cb2665dc5622eb3bbb12c331ecf58771ba?placeholderIfAbsent=true&apiKey=32ea7a6332e74b77babd6d1104c25fd5",
  },
];

function TrustedClients() {
  return (
    <section className="flex flex-col self-center w-full max-w-[1170px] mt-10 max-md:mt-10 max-md:max-w-full">
      <h2 className="self-center text-2xl font-bold text-center text-slate-800">
        OUR TRUSTED CLIENTS
      </h2>
      <div className="mt-12 w-full max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          {clients.map((client, index) => (
            <div
              key={index}
              className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full"
            >
              <div className="flex grow gap-3.5 px-9 py-9 w-full text-lg font-bold whitespace-nowrap bg-white rounded-md border border-solid border-stone-50 shadow-[-40px_40px_70px_rgba(25,25,25,0.04)] text-slate-800 tracking-[12.6px] max-md:px-5 max-md:mt-10">
                <img
                  loading="lazy"
                  src={client.logo}
                  alt={`${client.name} logo`}
                  className="object-contain shrink-0 aspect-[1.16] w-[43px]"
                />
                <div className="grow shrink my-auto w-[98px]">
                  {client.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustedClients;
