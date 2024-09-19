import React from "react";

function ClientTestimonial() {
  return (
    <section className="flex flex-col justify-center items-center px-20 py-14 mt-36 w-full bg-slate-200 max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="flex flex-col items-center max-w-full w-[854px]">
        <h2 className="text-5xl font-semibold leading-none text-center text-slate-800 max-md:max-w-full max-md:text-4xl">
          Few Words From Our Clients
        </h2>
        <div className="flex overflow-hidden relative flex-col flex-wrap gap-4 items-start self-stretch px-10 pt-2 pb-24 mt-10 fill-white min-h-[244px] max-md:px-5 max-md:pb-20 max-md:mt-8">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/348b5a0c94a3675d589bcbf882e7832c4788a4b0cfd07eebdc044d98c4bd6c2e?placeholderIfAbsent=true&apiKey=32ea7a6332e74b77babd6d1104c25fd5"
            alt=""
            className="object-cover absolute inset-0 size-full"
          />
          <div className="relative self-start text-7xl font-extrabold leading-none text-slate-800 max-md:text-4xl">
            "
          </div>
          <blockquote className="relative flex-auto self-end mt-4 text-lg leading-8 text-slate-800 w-[717px] max-md:max-w-full">
            Nokia has been a trusted partner in deploying our 5G network,
            consistently delivering cutting-edge technology and unparalleled
            expertise that have significantly enhanced connectivity for our
            customers. Their deep understanding of telecommunications, coupled
            with their innovative approach, has allowed us to stay ahead in the
            rapidly evolving digital landscape.
          </blockquote>
        </div>
        <div className="flex flex-wrap gap-10 mt-10 max-w-full w-[765px] max-md:mt-8">
          <div className="flex flex-auto gap-4 items-start text-lg text-slate-800">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/7a629f396a1bdda45a00681c53b899a843a764fa940ecf386a097d3059239059?placeholderIfAbsent=true&apiKey=32ea7a6332e74b77babd6d1104c25fd5"
              alt="Jane Cooper"
              className="object-contain shrink-0 w-14 rounded-full aspect-square"
            />
            <div className="flex flex-col self-stretch">
              <div className="self-start leading-8">Jane Cooper</div>
              <div className="font-semibold">CEO, ABC Corporation</div>
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/29c3e13dc0e18ed7ddd14dcee640a0b7da9f8ef729436eac1014f6f4e2ce60d5?placeholderIfAbsent=true&apiKey=32ea7a6332e74b77babd6d1104c25fd5"
              alt=""
              className="object-contain shrink-0 w-14 rounded-full aspect-square"
            />
          </div>
          <div className="flex flex-auto gap-10 self-start">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8724b9059c28456b77896c2c585ef0f5631d6a96bdd24b655616dd5a85cc3a41?placeholderIfAbsent=true&apiKey=32ea7a6332e74b77babd6d1104c25fd5"
              alt=""
              className="object-contain shrink-0 w-14 rounded-full aspect-square"
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/c256cccb376b31a62b6f74344d2d2ed925abfedef6314e50a2b3925957405887?placeholderIfAbsent=true&apiKey=32ea7a6332e74b77babd6d1104c25fd5"
              alt=""
              className="object-contain shrink-0 w-14 rounded-full aspect-square"
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d2725e1bdf99cc538bf14642ece8673cf05513c4cf1524cce99be47c296cf2a?placeholderIfAbsent=true&apiKey=32ea7a6332e74b77babd6d1104c25fd5"
              alt=""
              className="object-contain shrink-0 w-14 rounded-full aspect-square"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClientTestimonial;
