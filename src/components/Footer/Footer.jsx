import { Link } from "react-router-dom";
import Logo from "../../../public/favicon.png";
import { footerLinks } from "../../Data/Data.js";

// Social icons
import {
  RiFacebookFill,
  RiInstagramLine,
  RiDribbbleLine,
  RiLinkedinFill,
  RiTwitterFill,
} from "react-icons/ri";

const socialLists = [
  { id: 1, name: "Facebook", icon: <RiFacebookFill />, url: "https://www.facebook.com" },
  { id: 2, name: "Instagram", icon: <RiInstagramLine />, url: "https://www.instagram.com" },
  { id: 3, name: "Dribbble", icon: <RiDribbbleLine />, url: "https://www.dribbble.com" },
  { id: 4, name: "LinkedIn", icon: <RiLinkedinFill />, url: "https://www.linkedin.com" },
  { id: 5, name: "Twitter", icon: <RiTwitterFill />, url: "https://www.twitter.com" },
];

const Footer = () => {
  return (
    <footer className="py-20 bg-gray-900 dark:bg-gray-50 transition-colors duration-300">
      <div className="w-full flex flex-col items-center text-center px-4">

        {/* TOP GRID */}
        <div className="grid w-full max-w-[1400px] grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">

          {/* LEFT */}
          <div className="flex flex-col items-center lg:items-start">
            <Link>
              <img src={Logo} alt="Logo" className="h-28" />
            </Link>
            <p className="text-base mt-5 text-gray-300 dark:text-gray-700 max-w-xs">
              Great platform for the job seeker passionate about startups.
              Find your dream job easier.
            </p>
          </div>

          {/* MENU */}
          <div className="flex justify-center sm:justify-evenly gap-8">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold text-lg md:text-xl text-white dark:text-gray-900 mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.url}
                        className="text-gray-300 dark:text-gray-700 font-normal text-base hover:text-primaryColor hover:translate-x-2 transition-all duration-300 inline-block select-none"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-center lg:items-start">
            <h3 className="font-semibold text-lg md:text-xl text-white dark:text-gray-900 mb-3">
              Get job notifications
            </h3>
            <p className="w-full md:w-10/12 mb-5 text-gray-200/70 dark:text-gray-600">
              The latest job news and articles, sent to your inbox weekly
            </p>
            <form className="w-full max-w-sm">
              <div className="flex items-center w-full h-12 gap-4 overflow-hidden rounded-xl shadow-lg">
                <input
                  type="email"
                  className="flex-1 h-full px-4 text-base border-none outline-none rounded-l-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="Email Address"
                />
                <button className="py-3 px-6 bg-primaryColor text-white font-semibold rounded-r-xl hover:scale-105 hover:shadow-lg transition-all duration-300">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-[1400px] mt-10 pt-10 border-t border-gray-600/60 dark:border-gray-300/40 gap-5">
          <p className="text-sm sm:text-base text-gray-300/70 dark:text-gray-600">
            &copy; {new Date().getFullYear()} JobHunter. All rights reserved.
          </p>
          <ul className="flex items-center gap-3">
            {socialLists.map((social) => (
              <li key={social.id}>
                <Link
                  to={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-white/80 bg-white/10 dark:text-gray-900 dark:bg-gray-300/10
                             rounded-full transition-all duration-300 hover:bg-gradient-to-tr hover:from-primaryColor hover:to-purple-400 hover:text-white shadow-md"
                >
                  {social.icon}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
