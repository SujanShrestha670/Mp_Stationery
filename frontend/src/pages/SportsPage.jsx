import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "../layouts/Layout.jsx";
import CategoryCard from "../components/CategoryCard.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import Pagination from "../components/Pagination.jsx";

const SportsPage = () => {
  const [category, setCategory] = useState("football");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const sportsItems = {
    football: [
      "Football 1",
      "Football 2",
      "Football 3",
      "Football 4",
      "Football 5",
      "Football 6",
      "Football 7",
      "Football 8",
    ],
    basketball: [
      "Basketball 1",
      "Basketball 2",
      "Basketball 3",
      "Basketball 4",
      "Basketball 5",
      "Basketball 6",
      "Basketball 7",
      "Basketball 8",
    ],
    tennis: [
      "Tennis Racket 1",
      "Tennis Racket 2",
      "Tennis Racket 3",
      "Tennis Racket 4",
      "Tennis Racket 5",
      "Tennis Racket 6",
      "Tennis Racket 7",
      "Tennis Racket 8",
    ],
    cricket: [
      "Cricket Bat 1",
      "Cricket Bat 2",
      "Cricket Bat 3",
      "Cricket Bat 4",
      "Cricket Bat 5",
      "Cricket Bat 6",
      "Cricket Bat 7",
      "Cricket Bat 8",
    ],
    swimming: [
      "Swim Goggles 1",
      "Swim Goggles 2",
      "Swim Goggles 3",
      "Swim Goggles 4",
      "Swim Goggles 5",
      "Swim Goggles 6",
      "Swim Goggles 7",
      "Swim Goggles 8",
    ],
    athletics: [
      "Running Shoes 1",
      "Running Shoes 2",
      "Running Shoes 3",
      "Running Shoes 4",
      "Running Shoes 5",
      "Running Shoes 6",
      "Running Shoes 7",
      "Running Shoes 8",
    ],
    baseball: [
      "Baseball Glove 1",
      "Baseball Glove 2",
      "Baseball Glove 3",
      "Baseball Glove 4",
      "Baseball Glove 5",
      "Baseball Glove 6",
      "Baseball Glove 7",
      "Baseball Glove 8",
    ],
    cycling: [
      "Cycling Helmet 1",
      "Cycling Helmet 2",
      "Cycling Helmet 3",
      "Cycling Helmet 4",
      "Cycling Helmet 5",
      "Cycling Helmet 6",
      "Cycling Helmet 7",
      "Cycling Helmet 8",
    ],
  };

  const handleCategoryClick = (cat) => {
    setCategory(cat);
    setCurrentPage(1);
  };

  const currentItems = category
    ? sportsItems[category].slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : [];

  const totalPages = category
    ? Math.ceil(sportsItems[category].length / itemsPerPage)
    : 1;

  const categoryList = [
    { category: "football", title: "Football", icon: "⚽" },
    { category: "basketball", title: "Basketball", icon: "🏀" },
    { category: "tennis", title: "Tennis", icon: "🎾" },
    { category: "cricket", title: "Cricket", icon: "🏏" },
    { category: "swimming", title: "Swimming", icon: "🏊" },
    { category: "athletics", title: "Athletics", icon: "🏃" },
    { category: "baseball", title: "Baseball", icon: "⚾" },
    { category: "cycling", title: "Cycling", icon: "🚴" },
  ];

  return (
    <Layout>
      {/* Top Section */}
      <motion.section
        className="w-full bg-white px-4 py-6 md:px-8 md:py-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl font-semibold">Sports</h1>
          <p className="text-gray-600 mt-2">
            Browse all our available sports categories
          </p>
        </div>
      </motion.section>

      {/* Category Selection - KEEP original animation */}
      <section className="w-full px-4 py-10 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 md:gap-8 w-max md:w-auto p-2">
            {categoryList.map((item, index) => (
              <motion.div
                key={item.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                <CategoryCard
                  category={item.category}
                  title={item.title}
                  icon={item.icon}
                  selectedCategory={category}
                  onClick={handleCategoryClick}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      {category && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ProductGrid books={currentItems} category={category} />
        </motion.div>
      )}

      {/* Pagination */}
      {category && (
        <motion.section
          className="w-full py-6 px-4 md:px-8 bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              pageSize={itemsPerPage}
            />
          </div>
        </motion.section>
      )}
    </Layout>
  );
};

export default SportsPage;
