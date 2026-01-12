import { Link } from "react-router-dom";
import { jobPosts } from "../../Data/Data.js";
import { SlHeart } from "react-icons/sl";
import { IoMdTime } from "react-icons/io";
import { generateSlug } from "../../utils/index.js";

const FeaturedJobs = () => {
  return (
    <section className="py-20 bg-[#F8F8FD] dark:bg-gray-950">
      {/* Full-width wrapper with flex center */}
      <div className="w-full flex flex-col items-center">

        {/* Section Heading */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl tracking-[0.3em] uppercase 
          text-gray-600 dark:text-gray-400 mb-16 text-center">
          Featured Jobs
        </h1>

        {/* Grid wrapper */}
        <div className="flex justify-center w-full">
          <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3 xl:gap-6 w-full max-w-[1400px] px-4">
            {jobPosts.map((job) => (
              <Link
                to={`job-details/${generateSlug(job.title)}`}
                key={job.company + job.title}
                className="relative group transition-all duration-500
                  bg-white/80 dark:bg-gray-900/80
                  backdrop-blur-md
                  border border-gray-200 dark:border-gray-700
                  rounded-3xl
                  shadow-lg hover:shadow-2xl
                  hover:-translate-y-2
                  p-6 md:p-7 lg:p-8
                  flex flex-col items-center text-center"
              >
                {/* Top Row: Icon + Title + Favorite */}
                <div className="flex flex-col items-center gap-4 w-full">
                  {/* Logo */}
                  <div className="
                    h-16 w-16 flex items-center justify-center
                    rounded-full
                    bg-gradient-to-br from-primaryColor/20 to-purple-200/20
                    shadow-md group-hover:shadow-lg
                    transition-all duration-500
                    p-3
                  ">
                    <img
                      src={job.logo}
                      alt={job.company}
                      className="w-8 h-8 object-contain"
                    />
                  </div>

                  {/* Title & Company */}
                  <div className="flex flex-col items-center w-full">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
                      {job.title}
                    </h3>
                    <p className="text-sm flex items-center gap-2 font-medium text-gray-500 dark:text-gray-400">
                      <span>{job.company}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-400/70 dark:bg-gray-500"></span>
                      <span>{job.application} Applications</span>
                    </p>
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => e.stopPropagation()}
                    type="button"
                    title="Add to favorites"
                    className="flex items-center justify-center w-9 h-9 rounded-full
                      border border-gray-200 dark:border-gray-700
                      bg-gray-300/10 dark:bg-gray-800
                      group-hover:border-primaryColor group-hover:bg-primaryColor/10
                      transition-all duration-300 mt-2"
                  >
                    <SlHeart className="text-gray-400 group-hover:text-primaryColor transition" />
                  </button>
                </div>

                {/* Role Tags */}
                <ul className="flex flex-wrap justify-center items-center gap-2 mt-5 mb-4">
                  {job.role.map((role, index) => (
                    <li
                      key={index}
                      className={`py-1 px-3 rounded-full text-xs md:text-sm font-semibold shrink-0
                        ${
                          index === 0
                            ? "bg-[#6a1fff15] text-[#6a1fffd8]"
                            : index === 1
                            ? "bg-[#16a34a1f] text-[#16a34a]"
                            : index === 2
                            ? "bg-[#ff832a1f] text-[#ff832ae5]"
                            : "bg-gray-200/20 text-gray-600 dark:bg-gray-700/20 dark:text-gray-300"
                        }`}
                    >
                      {role}
                    </li>
                  ))}
                </ul>

                {/* Description */}
                <p className="text-base font-medium leading-7 line-clamp-3 text-gray-700/85 dark:text-gray-300">
                  {job.description}
                </p>

                {/* Divider */}
                <div className="h-[1px] w-full my-6 bg-gray-200/40 dark:bg-gray-700"></div>

                {/* Footer */}
                <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between w-full">
                  <h3 className="font-semibold text-sm sm:text-base text-gray-900/80 dark:text-gray-200">
                    ${job.salary} <span className="text-gray-500 dark:text-gray-400">/hr</span>
                  </h3>
                  <div className="flex items-center gap-2">
                    <IoMdTime className="text-lg text-gray-500 dark:text-gray-400" />
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Posted: {job.date}
                    </p>
                  </div>
                </div>

                {/* Glow effect */}
                <span className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primaryColor/20 to-purple-300/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
