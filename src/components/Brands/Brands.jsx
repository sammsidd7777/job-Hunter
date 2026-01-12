import brand1 from "../../assets/images/brands/brand1.png";
import brand2 from "../../assets/images/brands/brand2.png";
import brand3 from "../../assets/images/brands/brand3.png";
import brand4 from "../../assets/images/brands/brand4.png";
import brand5 from "../../assets/images/brands/brand5.png";

const brands = [
  { name: "Vodafone", image: brand1 },
  { name: "Intel", image: brand2 },
  { name: "Tesla", image: brand3 },
  { name: "AMD", image: brand4 },
  { name: "Talkit", image: brand5 },
];

const Brands = () => {
  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 overflow-hidden transition-colors">
      
      {/* Glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08),transparent_60%)] z-0" />

      <div className="relative z-10 flex flex-col items-center text-center mx-auto max-w-[1400px]">

        {/* Heading */}
        <h1 className="text-sm md:text-base tracking-[0.3em] uppercase text-gray-600 dark:text-gray-400 mb-12 w-full text-center">
          Trusted by fast-growing companies worldwide
        </h1>

        {/* Marquee Container */}
        <div className="w-full overflow-hidden rounded-3xl 
                        bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl
                        border border-gray-200/40 dark:border-gray-700/40
                        shadow-[0_10px_40px_rgba(0,0,0,0.05)]
                        flex justify-center">

          <div className="flex whitespace-nowrap animate-marquee gap-16 justify-center p-7 ">
            {[...brands, ...brands].map((brand, index) => (
              <div key={index} className="group flex items-center justify-center min-w-[140px]">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="h-6 md:h-10 object-contain opacity-60 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;
