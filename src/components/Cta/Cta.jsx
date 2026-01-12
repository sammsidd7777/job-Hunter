import DashboardImage from "../../assets/images/cta/3.1 Dashboard Company.jpg";

const Cta = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Full-width centered wrapper */}
      <div className="w-full flex justify-center px-4">
        <div className="relative grid md:grid-cols-2 items-center bg-gradient-to-br from-primaryColor/10 to-purple-100/10 
                        rounded-3xl lg:pt-20 lg:px-20 pt-16 pb-16 px-8 gap-10 overflow-hidden shadow-xl">

          {/* Decorative shapes */}
          <span className="absolute -top-[250px] -left-[200px] w-[100px] h-[700px] bg-white rotate-[60deg] opacity-20 rounded-full"></span>
          <span className="absolute -bottom-[350px] right-0 w-[100px] h-[700px] bg-white rotate-[60deg] opacity-20 rounded-full"></span>

          {/* Text content */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-5 z-10">
            <h2 className="font-clashDisplay font-bold text-4xl md:text-5xl lg:text-6xl leading-tight text-gray-900 dark:text-gray-100">
              Start posting <br className="hidden sm:block" /> jobs today
            </h2>
            <p className="max-w-md text-gray-700 dark:text-gray-300 text-base md:text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Start connecting with top talent today.
            </p>
            <button className="mt-3 py-3 px-6 font-semibold rounded-xl 
                               bg-primaryColor text-white dark:bg-white dark:text-primaryColor
                               hover:scale-105 hover:shadow-lg transition-transform duration-300">
              Sign up for free
            </button>
          </div>

          {/* Image */}
          <div className="flex justify-center md:justify-end z-10">
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <img src={DashboardImage} alt="Dashboard image" className="rounded-3xl object-cover w-full h-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
