import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "../layouts/Layout.jsx";
import CategoryCard from "../components/CategoryCard.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import Pagination from "../components/Pagination.jsx";

const CategoriesPage = () => {
  const [category, setCategory] = useState("books"); // default category
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const categoryItems = {
    books: [
      "The Great Gatsby",
      "1984",
      "To Kill a Mockingbird",
      "The Catcher in the Rye",
      "Moby Dick",
      "Pride and Prejudice",
    ],
    stationery: [
      "Notebook",
      "Pen Set",
      "Markers",
      "Sticky Notes",
      "Binder",
      "Highlighter",
    ],
    gifts: [
      "Gift Card",
      "Photo Frame",
      "Mug",
      "Keychain",
      "Personalized Journal",
      "LED Lamp",
    ],
    sports: [
      "Football",
      "Basketball",
      "Tennis Racket",
      "Cricket Bat",
      "Running Shoes",
      "Swim Goggles",
    ],
  };

  const handleCategoryClick = (cat) => {
    setCategory(cat);
    setCurrentPage(1);
  };

  const currentItems = category
    ? categoryItems[category].slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : [];

  const totalPages = category
    ? Math.ceil(categoryItems[category].length / itemsPerPage)
    : 1;

  const categoryList = [
    { category: "books", title: "Books", icon: "📚" },
    { category: "stationery", title: "Stationery", icon: "✏️" },
    { category: "gifts", title: "Gifts", icon: "🎁" },
    { category: "sports", title: "Sports", icon: "🏀" },
  ];

  return (
    <Layout>
      {/* Top Section - Changed to StationeryPage style animation */}
      <motion.section
        className="w-full bg-white px-4 py-6 md:px-8 md:py-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl font-semibold">Categories</h1>
          <p className="text-gray-600 mt-2">
            Explore our curated product categories
          </p>
        </div>
      </motion.section>

      {/* Category Selection with original staggered animation */}
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

      {/* Product Grid - Changed to StationeryPage style animation */}
      {category && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ProductGrid books={currentItems} category={category} />
        </motion.div>
      )}

      {/* Pagination - Changed to StationeryPage style animation */}
      {category && (
        <motion.section
          className="w-full py-6 px-4 md:px-8 bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
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

export default CategoriesPage;
