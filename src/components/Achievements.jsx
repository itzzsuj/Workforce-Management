import React from "react";

function AchievementsSection() {
  const achievements = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/71dc26e390207d0c9463d1d663ab146eff0c2ed4a05614fd00bb591e68d56071?placeholderIfAbsent=true&apiKey=32ea7a6332e74b77babd6d1104c25fd5",
      number: "10,000+",
      text: "Projects Completed",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/fefc5b49d98a745eba70521b4df32a031d1a74afccd7f5ffac0c8aa09aa78558?placeholderIfAbsent=true&apiKey=32ea7a6332e74b77babd6d1104c25fd5",
      number: "2 Million",
      text: "Satisfied Customers",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/55e85ef6dfc3da5accd5fe6c5eae50e268257d8623993e8a2d573e96be74cefb?placeholderIfAbsent=true&apiKey=32ea7a6332e74b77babd6d1104c25fd5",
      number: "140",
      text: "Countries Reached",
    },
  ];

  return (
    <section className="flex flex-col items-center mt-20 w-full max-w-[1170px] mx-auto px-10 max-md:mt-10">
      <div className="text-center">
        <h2 className="text-5xl font-semibold text-slate-800 leading-tight max-md:text-4xl max-md:leading-tight">
          Over a Decade of Achievements
        </h2>
        <p className="mt-4 text-lg text-slate-600">
          With our expertise, we have achieved incredible milestones over the years.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-10 mt-14 max-md:flex-col max-md:gap-8">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className="flex flex-col items-center w-[30%] max-md:w-full bg-white p-8 rounded-lg shadow-lg"
          >
            <img
              loading="lazy"
              src={achievement.icon}
              alt=""
              className="w-[66px] h-[66px] mb-6"
            />
            <div className="text-4xl font-bold text-slate-800 mb-4">
              {achievement.number}
            </div>
            <p className="text-lg text-slate-600 text-center">
              {achievement.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AchievementsSection;
