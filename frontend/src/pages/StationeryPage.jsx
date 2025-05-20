import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "../layouts/Layout.jsx";
import CategoryCard from "../components/CategoryCard.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import Pagination from "../components/Pagination.jsx";

const StationeryPage = () => {
  const [category, setCategory] = useState("pen");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const stationeryItems = {
    pen: [
      "Pen 1",
      "Pen 2",
      "Pen 3",
      "Pen 4",
      "Pen 5",
      "Pen 6",
      "Pen 7",
      "Pen 8",
    ],
    pencil: [
      "Pencil 1",
      "Pencil 2",
      "Pencil 3",
      "Pencil 4",
      "Pencil 5",
      "Pencil 6",
      "Pencil 7",
      "Pencil 8",
    ],
    eraser: [
      "Eraser 1",
      "Eraser 2",
      "Eraser 3",
      "Eraser 4",
      "Eraser 5",
      "Eraser 6",
      "Eraser 7",
      "Eraser 8",
    ],
    sharpener: [
      "Sharpener 1",
      "Sharpener 2",
      "Sharpener 3",
      "Sharpener 4",
      "Sharpener 5",
      "Sharpener 6",
      "Sharpener 7",
      "Sharpener 8",
    ],
    color: [
      "Color 1",
      "Color 2",
      "Color 3",
      "Color 4",
      "Color 5",
      "Color 6",
      "Color 7",
      "Color 8",
    ],
    marker: [
      "Marker 1",
      "Marker 2",
      "Marker 3",
      "Marker 4",
      "Marker 5",
      "Marker 6",
      "Marker 7",
      "Marker 8",
    ],
    tipex: [
      "Tipex 1",
      "Tipex 2",
      "Tipex 3",
      "Tipex 4",
      "Tipex 5",
      "Tipex 6",
      "Tipex 7",
      "Tipex 8",
    ],
    highlighter: [
      "Highlighter 1",
      "Highlighter 2",
      "Highlighter 3",
      "Highlighter 4",
      "Highlighter 5",
      "Highlighter 6",
      "Highlighter 7",
      "Highlighter 8",
    ],
  };

  const handleCategoryClick = (cat) => {
    setCategory(cat);
    setCurrentPage(1);
  };

  const currentItems = category
    ? stationeryItems[category].slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : [];

  const totalPages = category
    ? Math.ceil(stationeryItems[category].length / itemsPerPage)
    : 1;

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
          <h1 className="text-2xl md:text-3xl font-semibold">Stationery</h1>
          <p className="text-gray-600 mt-2">
            Browse all our available stationery categories
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
              category="pen"
              title="Pen"
              icon="✒️"
              selectedCategory={category}
              onClick={handleCategoryClick}
            />
            <CategoryCard
              category="pencil"
              title="Pencil"
              icon="✏️"
              selectedCategory={category}
              onClick={handleCategoryClick}
            />
            <CategoryCard
              category="eraser"
              title="Eraser"
              icon="🧽"
              selectedCategory={category}
              onClick={handleCategoryClick}
            />
            <CategoryCard
              category="sharpener"
              title="Sharpener"
              icon="🔪"
              selectedCategory={category}
              onClick={handleCategoryClick}
            />
            <CategoryCard
              category="color"
              title="Color"
              icon="🖍️"
              selectedCategory={category}
              onClick={handleCategoryClick}
            />
            <CategoryCard
              category="marker"
              title="Marker"
              icon="🖊️"
              selectedCategory={category}
              onClick={handleCategoryClick}
            />
            <CategoryCard
              category="tipex"
              title="Tipex"
              icon="✂️"
              selectedCategory={category}
              onClick={handleCategoryClick}
            />
            <CategoryCard
              category="highlighter"
              title="Highlighter"
              icon="🖍️"
              selectedCategory={category}
              onClick={handleCategoryClick}
            />
          </div>
        </div>
      </motion.section>

      {/* Product Grid */}
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

      {/* Pagination */}
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

export default StationeryPage;
