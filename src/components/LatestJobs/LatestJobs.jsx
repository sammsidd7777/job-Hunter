import { Link } from "react-router-dom";
import { latestJobLists } from "../../Data/Data.js";
import Pattern from "../../assets/images/latest-jobs/Pattern.svg";
import { generateSlug } from "../../utils/index.js";

const LatestJobs = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="w-full flex flex-col items-center relative overflow-x-hidden">
        <h1 className="text-2xl md:text-3xl lg:text-4xl tracking-[0.3em] uppercase 
          text-gray-600 dark:text-gray-400 mb-16">
          Latest jobs
        </h1>

        <div className="flex justify-center w-full mt-10">
          <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3 w-full max-w-[1400px] px-4">
            {latestJobLists.map((joblist) => (
              <Link
                key={joblist.id}
                to={`${generateSlug(joblist.title)}`}
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
                {/* Logo */}
                <div className="h-16 w-16 flex items-center justify-center rounded-full
                  bg-gradient-to-br from-primaryColor/20 to-purple-200/20
                  shadow-md group-hover:shadow-lg transition-all duration-500
                  p-3 mb-4">
                  <img
                    src={joblist.logo}
                    className="w-8 lg:w-10 object-contain"
                    alt={joblist.companyName}
                  />
                </div>

                {/* Job Title (NO Link inside) */}
                <h3 className="mb-1 text-lg sm:text-xl font-semibold 
                  text-gray-900 dark:text-gray-100 
                  transition duration-300 group-hover:text-primaryColor">
                  {joblist.title}
                </h3>

                {/* Company & Location */}
                <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                  {joblist.companyName} <span>{joblist.location}</span>
                </p>

                {/* Job Type & Fields */}
                <div className="flex flex-wrap justify-center items-center gap-2">
                  <span className="px-[10px] text-xs py-[4px] lg:text-sm border rounded-full
                    text-[#56CDAD] bg-[#56CDAD1A] dark:bg-[#56CDAD2A]">
                    {joblist.JobType}
                  </span>

                  <div className="h-7 w-[1px] bg-gray-200 dark:bg-gray-600 mx-2"></div>

                  <div className="flex flex-wrap gap-2">
                    {joblist.jobFields.map((jobfield, index) => (
                      <span
                        key={index}
                        className={`border py-[4px] px-[10px] rounded-full text-sm
                          ${
                            index === 0
                              ? "border-[#ffb93637] bg-[#ffb9360f] text-[#FFB836]"
                              : index === 1
                              ? "border-[#4540de1c] bg-[#4540de0f] text-[#4540de]"
                              : "border-gray-300 bg-gray-100 text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                          }`}
                      >
                        {jobfield.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Glow */}
                <span className="absolute -inset-1 rounded-3xl
                  bg-gradient-to-r from-primaryColor/20 to-purple-300/20
                  opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500">
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Background Pattern */}
        <img
          src={Pattern}
          alt="Pattern"
          className="absolute top-0 opacity-10 w-[450px] h-full right-10 -z-10"
        />
      </div>
    </section>
  );
};

export default LatestJobs;
