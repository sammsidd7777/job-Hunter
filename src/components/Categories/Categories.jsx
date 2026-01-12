import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";
import { categories } from "../../Data/Data.js";

const Categories = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-950 transition-colors">
      {/* Full-width wrapper, centered */}
      <div className="w-full flex flex-col items-center text-center">

        {/* Heading */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl tracking-[0.3em] uppercase 
          text-gray-600 dark:text-gray-400 mb-16 text-center">
          Explore by Category
        </h1>

        {/* Grid wrapper */}
        <div className="flex justify-center w-full">
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full max-w-[1400px] px-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to="/find-jobs"
                className="relative group flex flex-col items-center text-center p-8 rounded-3xl
                  bg-white/80 dark:bg-gray-900/80
                  backdrop-blur-md
                  border border-gray-200 dark:border-gray-700
                  shadow-lg hover:shadow-2xl
                  hover:border-primaryColor
                  hover:-translate-y-2
                  transition-all duration-500"
              >
                {/* Icon */}
                <div className="w-16 h-16 flex items-center justify-center rounded-full
                  bg-gradient-to-br from-primaryColor/20 to-primaryColor/50
                  text-primaryColor mb-6
                  group-hover:scale-110
                  transition-transform duration-500"
                >
                  <img src={category.icon} alt={category.name} className="w-8 h-8" />
                </div>

                {/* Category Name */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100
                  group-hover:text-primaryColor
                  transition-colors duration-500"
                >
                  {category.name}
                </h3>

                {/* Jobs Info */}
                <div className="mt-3 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  {category.jobs} Jobs available
                  <GoArrowRight className="text-primaryColor transition-transform duration-300 group-hover:translate-x-2" />
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

export default Categories;
