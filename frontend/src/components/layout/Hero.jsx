import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import books_thumbnail from "../../assets/books_thumbnail.jpeg";
import arts_crafts_thumbnail from "../../assets/istockphoto-626841510-612x612.jpg";
import stationery_thumbnail from "../../assets/360_F_951915996_PfCnh9fQ9NctWD28TXpFmRp67PfYRPf3.jpg";
import classroomSupplies_thumbnail from "../../assets/gettyimages-1435012919-640x640.jpg";
import gifting_thumbnail from "../../assets/istockphoto-1845052575-640x640.jpg";
import sports_thumbnail from "../../assets/istockphoto-911113034-640x640.jpg";
import trandingProducts_thumbnail from "../../assets/360_F_1214544212_oucLoQrgGrK1ZJH1IseDL1yX2eoaGKCF.jpg";

const Hero = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const products = [
    {
      name: "Product 1",
      rating: 4.5,
      price: "$19.99",
      image: trandingProducts_thumbnail,
    },
    {
      name: "Product 2",
      rating: 4.0,
      price: "$29.99",
      image: trandingProducts_thumbnail,
    },
    {
      name: "Product 3",
      rating: 3.5,
      price: "$39.99",
      image: trandingProducts_thumbnail,
    },
    {
      name: "Product 4",
      rating: 5.0,
      price: "$49.99",
      image: trandingProducts_thumbnail,
    },
    {
      name: "Product 5",
      rating: 4.2,
      price: "$59.99",
      image: trandingProducts_thumbnail,
    },
    {
      name: "Product 6",
      rating: 4.8,
      price: "$69.99",
      image: trandingProducts_thumbnail,
    },
    {
      name: "Product 7",
      rating: 3.8,
      price: "$79.99",
      image: trandingProducts_thumbnail,
    },
    {
      name: "Product 8",
      rating: 4.3,
      price: "$89.99",
      image: trandingProducts_thumbnail,
    },
  ];

  const categories = [
    { name: "Books", image: books_thumbnail },
    { name: "Arts and Crafts", image: arts_crafts_thumbnail },
    { name: "Stationery", image: stationery_thumbnail },
    { name: "Classroom Supplies", image: classroomSupplies_thumbnail },
    { name: "Gifting", image: gifting_thumbnail },
    { name: "Sports", image: sports_thumbnail },
  ];

  return (
    <div className="heroSection px-4 md:px-8 mt-8 md:mt-16">
      <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center tracking-wide">
        Trending Products
      </h2>
      {isMobile ? (
        <div className="flex overflow-x-scroll space-x-4 mb-4 mt-4 p-4 hide-scrollbar">
          {products.map((product, index) => (
            <div key={index} className="flex-shrink-0 w-64">
              <div className="card bg-base-100 w-full shadow-lg">
                <figure className="px-4 pt-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="rounded-xl w-full h-40 object-cover"
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{product.name}</h2>
                  <p>Rating: {product.rating} ⭐</p>
                  <p className="text-gray-800 font-bold">{product.price}</p>
                  <div className="card-actions">
                    <button className="btn btn-primary">Order Now</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8 mt-8 md:mt-16">
          {products.map((product, index) => (
            <div key={index} className="card bg-base-100 w-full shadow-lg">
              <figure className="px-4 pt-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="rounded-xl w-full h-40 object-cover"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{product.name}</h2>
                <p>Rating: {product.rating} ⭐</p>
                <p className="text-gray-800 font-bold">{product.price}</p>
                <div className="card-actions">
                  <button className="btn btn-primary">Order Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <h2 className="text-2xl md:text-4xl font-bold mt-8 md:mt-16 text-center mb-4 tracking-wide">
        Order by category
      </h2>
      {!isMobile && (
        <p className="text-lg md:text-xl text-center text-gray-600 tracking-wide">
          Browse our selected categories to find exactly what you need!
        </p>
      )}
      {isMobile ? (
        <div className="flex overflow-x-scroll space-x-4 mt-8 md:mt-16 hide-scrollbar h-48 p-4">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/${category.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="flex-shrink-0 w-40"
            >
              <div className="rounded-lg shadow-lg flex flex-col items-center w-full h-36">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-base md:text-lg font-semibold mt-2 text-center tracking-wide">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8 md:mt-16">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/${category.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="flex flex-col items-center transform transition-transform duration-300 hover:scale-105"
            >
              <div className="rounded-lg shadow-lg flex flex-col items-center w-full h-full">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-base md:text-lg font-semibold mt-2 text-center tracking-wide">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Hero;
