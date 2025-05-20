import React, { useState, useEffect, useRef, useMemo } from "react";
import img1 from "../../assets/6010836baf4234067228f982_6002086f72b7278bf001d3fc_wireframe.jpeg";
import img2 from "../../assets/Wireframes.png";

const PosterSection = () => {
  const images = useMemo(() => [img1, img2], []); // memoized to avoid re-creating array
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);
  const intervalTime = 3000;
  const brightness = 0.8;

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, intervalTime);

    return () => clearInterval(intervalRef.current); // clear on unmount
  }, [images.length]);

  return (
    <section className="w-full h-60 md:h-130 relative bg-gray-100 overflow-hidden">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index}`}
          loading="lazy"
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
            currentIndex === index ? "opacity-100" : "opacity-0"
          }`}
          style={{ filter: `brightness(${brightness})` }}
        />
      ))}

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2 md:gap-3">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`w-[30px] md:w-[40px] h-[10px] md:h-[15px] rounded-[10px] transition-all duration-500 ${
              currentIndex === idx ? "bg-[#F3F3F3]" : "bg-[#979999]"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default PosterSection;
