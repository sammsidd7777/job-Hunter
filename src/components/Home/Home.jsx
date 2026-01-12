import { useState, useRef, useEffect } from "react";
import { RiSearchLine, RiArrowDownSLine } from "react-icons/ri";
import { SlLocationPin } from "react-icons/sl";

const popularLists = ["UI Designer", "UX Researcher", "Android", "Admin"];

const Home = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("India, Delhi");
  const dropdownRef = useRef(null);

  const locations = [
    "Mumbai, Maharashtra",
    "Bangalore, Karnataka",
    "Pune, Maharashtra",
    "Chennai, Tamil Nadu",
    "Hyderabad, Telangana",
  ];

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="bg-gray-50 dark:bg-gray-950 py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 flex justify-center">
      <div className="w-full min-h-screen flex flex-col justify-center items-center px-4 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">

  {/* Heading */}
  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-snug lg:leading-[1.1] text-gray-900 dark:text-gray-100 mb-4 text-center max-w-3xl">
    Discover more than{" "}
    <span className="bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent">
      5000+ Jobs
    </span>
  </h1>

  {/* Description */}
  <p className="text-sm md:text-base tracking-[0.3em]  text-gray-600 dark:text-gray-400 mb-12 w-full text-center dark:text-gray-300 mb-8 max-w-2xl text-center">
    A premium platform for ambitious job seekers passionate about startups, helping you discover opportunities and accelerate your career growth.
  </p>

  {/* Search Bar */}
  <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-4 sm:p-6 md:p-8 transition-colors duration-300">
    <div className="flex flex-col sm:flex-row gap-3 items-center">

      {/* Job Title */}
      <div className="flex items-center w-full gap-2 sm:gap-3 border border-gray-300 dark:border-gray-600 focus-within:border-blue-500/70 transition-all duration-300 py-2 px-3 rounded-xl bg-gray-50 dark:bg-gray-900">
        <RiSearchLine className="text-gray-400 dark:text-gray-300" size={20} />
        <input
          type="text"
          placeholder="Job title or Keywords"
          className="w-full py-2 text-sm sm:text-base bg-transparent text-gray-900 dark:text-gray-100 outline-none placeholder-gray-400 dark:placeholder-gray-500"
        />
      </div>

      {/* Location */}
      <div
        className="relative flex items-center w-full gap-2 sm:gap-3 border border-gray-300 dark:border-gray-600 py-2 px-3 rounded-xl bg-gray-50 dark:bg-gray-900"
        ref={dropdownRef}
      >
        <SlLocationPin className="text-gray-400 dark:text-gray-300" size={20} />
        <div className="w-full">
          <div className="flex items-center justify-between cursor-pointer" onClick={toggleDropdown}>
            <input
              type="text"
              value={selectedLocation}
              readOnly
              className="w-full text-sm sm:text-base bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
            />
            <RiArrowDownSLine
              className={`text-gray-400 dark:text-gray-300 transition-transform duration-300 ${
                isDropdownOpen ? "rotate-180 text-blue-500" : ""
              }`}
            />
          </div>

          {isDropdownOpen && (
            <ul className="absolute left-0 w-full bg-white dark:bg-gray-800 shadow-xl mt-2 rounded-2xl z-20 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
              {locations.map((location) => (
                <li
                  key={location}
                  className="px-4 py-2 cursor-pointer hover:bg-blue-100/30 dark:hover:bg-blue-500/30 rounded-md transition"
                  onClick={() => handleLocationSelect(location)}
                >
                  {location}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Search Button */}
      <button className="px-6 sm:px-8 py-2 sm:py-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm sm:text-base font-semibold hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-300">
        Search
      </button>
    </div>
  </div>

  {/* Popular Tags */}
  <div className="mt-6 flex flex-col items-center gap-3">
    <span className="text-gray-500 text-center text-sm sm:text-base font-medium tracking-wide">
      Popular Tags:
    </span>
    <div className="flex flex-wrap justify-center gap-3">
      {popularLists.map((tag) => (
        <span
          key={tag}
          className="px-4 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-full cursor-pointer 
                     transition-all duration-300 hover:bg-blue-500/20 hover:text-blue-600 dark:hover:bg-blue-400/30 dark:hover:text-blue-300 font-medium"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>

</div>

    </section>
  );
};

export default Home;
