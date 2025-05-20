import { useState } from "react";
import { motion } from "framer-motion"; // Import motion from framer-motion
import Layout from "../layouts/Layout.jsx";
import CategoryCard from "../components/CategoryCard.jsx"; // Import the new component
import ProductGrid from "../components/ProductGrid.jsx"; // Import ProductGrid
import Pagination from "../components/Pagination.jsx"; // Import Pagination

const BooksPage = () => {
  const [category, setCategory] = useState("non-academic"); // Default selected
  const [subCategory, setSubCategory] = useState("science"); // Default for academic
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const booksPerPage = 4; // Number of books per page

  const handleCategoryClick = (cat) => {
    setCategory(cat);
    setSubCategory(cat === "academic" ? "science" : null); // Reset or default subcategory
    setCurrentPage(1); // Reset to first page when category changes
  };

  const academicBooks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
    (num) => `${subCategory} Book ${num}`
  );
  const nonAcademicBooks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
    (num) => `Non-Academic Book ${num}`
  );

  // Get the books to display based on the current page
  const currentBooks =
    category === "academic" && subCategory
      ? academicBooks.slice(
          (currentPage - 1) * booksPerPage,
          currentPage * booksPerPage
        )
      : nonAcademicBooks.slice(
          (currentPage - 1) * booksPerPage,
          currentPage * booksPerPage
        );

  const totalPages =
    category === "academic" && subCategory
      ? Math.ceil(academicBooks.length / booksPerPage)
      : Math.ceil(nonAcademicBooks.length / booksPerPage);

  return (
    <Layout>
      {/* Top Section */}
      <motion.section
        className="w-full bg-white px-4 py-6 md:px-8 md:py-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl font-semibold">Books</h1>
          <p className="text-gray-600 mt-2">
            Browse all our available book categories
          </p>
        </div>
      </motion.section>

      {/* Category Selection */}
      <motion.section
        className="w-full px-4 py-10 md:px-8 bg-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 md:gap-8 w-max md:w-auto p-2">
            <CategoryCard
              category="non-academic"
              title="Non-Academic Books"
              icon="📚"
              selectedCategory={category}
              onClick={handleCategoryClick}
            />
            <CategoryCard
              category="academic"
              title="Academic Books"
              icon="🎓"
              selectedCategory={category}
              onClick={handleCategoryClick}
            />
          </div>
        </div>
      </motion.section>

      {/* Academic Category Selection */}
      {category === "academic" && (
        <motion.section
          className="w-full px-4 py-10 md:px-8 bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl font-semibold mb-6">Academic Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["Science", "Management", "Hotel Management"].map((cat) => (
                <div
                  key={cat}
                  onClick={() => setSubCategory(cat.toLowerCase())}
                  className={`p-6 rounded text-center cursor-pointer font-medium ${
                    subCategory === cat.toLowerCase()
                      ? "bg-green-300"
                      : "bg-green-100"
                  }`}
                >
                  {cat}
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* Academic Books Grid */}
      {category === "academic" && subCategory && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ProductGrid
            books={currentBooks}
            category={category}
            subCategory={subCategory}
          />
        </motion.div>
      )}

      {/* Non-Academic Books Grid */}
      {category === "non-academic" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ProductGrid books={currentBooks} category={category} />
        </motion.div>
      )}

      {/* Pagination */}
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
            pageSize={booksPerPage}
          />
        </div>
      </motion.section>
    </Layout>
  );
};

export default BooksPage;
