import React from "react";
import Nokia from "../images/NOKIA.gif";

function AboutUs() {
  return (
    <section className="mt-40 max-md:mt-10">
      <h2 className="self-center text-5xl font-semibold leading-none text-center text-slate-800 max-md:text-4xl">
        Who are we ?
      </h2>
      <p className="self-center mt-6 text-base leading-loose text-center text-slate-800 max-md:max-w-full">
        Nokia has over 150 years of experience, having been founded in 1865,
        evolving from a paper mill to a global leader in telecommunications and
        technology.
      </p>
      <img
        loading="lazy"
        src={Nokia}
        alt="Nokia company overview"
        className="mx-auto mt-12 w-[90%] max-w-[854px] h-auto rounded-full aspect-[3/1] max-md:mt-10"
      />
    </section>
  );
}

export default AboutUs;
