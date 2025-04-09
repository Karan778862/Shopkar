import { useEffect, useState } from "react";

const Banner = () => {
  const [currentAd, setCurrentAd] = useState(0);
  const ads = [
    "https://as1.ftcdn.net/v2/jpg/02/68/48/86/1000_F_268488616_wcoB2JnGbOD2u3bpn2GPmu0KJQ4Ah66T.jpg", // Replace with your ad image URLs
    "https://as1.ftcdn.net/v2/jpg/04/84/61/16/1000_F_484611602_icrCDiNfOrhVlLhKqiitIXfwsh0Sa2y2.jpg",
    "https://as1.ftcdn.net/v2/jpg/05/00/19/42/1000_F_500194267_ZePYA1x6XhyZEoqs5H1bZ32Q7UCblCRE.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length); // Loop through the ads
    }, 3000); // Change ad every 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [ads.length]);

  return (
    <div className="relative p-4 w-full h-[200px] md:h-[400px] overflow-hidden">
      <div className="absolute inset-0 flex transition-all duration-500">
        <img
          src={ads[currentAd]}
          alt={`Ad ${currentAd}`}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Optional controls to go next/previous */}
      <button
        onClick={() => setCurrentAd((currentAd - 1 + ads.length) % ads.length)}
        className="absolute top-[50%] left-0 text-3xl text-gray-300 bg-white    p-2"
      >
        {"<"}
      </button>
      <button
        onClick={() => setCurrentAd((currentAd + 1) % ads.length)}
        className="absolute top-[50%] right-0 text-3xl text-gray-300 bg-white    p-2"
      >
        {">"}
      </button>
    </div>
  );
};

export default Banner;
