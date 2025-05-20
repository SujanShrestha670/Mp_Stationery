import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "../layouts/Layout.jsx";
import CategoryCard from "../components/CategoryCard.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import Pagination from "../components/Pagination.jsx";

const GiftsPage = () => {
  const [category, setCategory] = useState("birthday");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const giftsItems = {
    birthday: [
      "Birthday Gift 1",
      "Birthday Gift 2",
      "Birthday Gift 3",
      "Birthday Gift 4",
      "Birthday Gift 5",
      "Birthday Gift 6",
    ],
    anniversary: [
      "Anniversary Gift 1",
      "Anniversary Gift 2",
      "Anniversary Gift 3",
      "Anniversary Gift 4",
      "Anniversary Gift 5",
      "Anniversary Gift 6",
    ],
    wedding: [
      "Wedding Gift 1",
      "Wedding Gift 2",
      "Wedding Gift 3",
      "Wedding Gift 4",
      "Wedding Gift 5",
      "Wedding Gift 6",
    ],
    christmas: [
      "Christmas Gift 1",
      "Christmas Gift 2",
      "Christmas Gift 3",
      "Christmas Gift 4",
      "Christmas Gift 5",
      "Christmas Gift 6",
    ],
  };

  const handleCategoryClick = (cat) => {
    setCategory(cat);
    setCurrentPage(1);
  };

  const currentItems = category
    ? giftsItems[category].slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : [];

  const totalPages = category
    ? Math.ceil(giftsItems[category].length / itemsPerPage)
    : 1;

  const categoryList = [
    { category: "birthday", title: "Birthday", icon: "🎂" },
    { category: "anniversary", title: "Anniversary", icon: "💍" },
    { category: "wedding", title: "Wedding", icon: "👰" },
    { category: "christmas", title: "Christmas", icon: "🎄" },
  ];

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
          <h1 className="text-2xl md:text-3xl font-semibold">Gifts</h1>
          <p className="text-gray-600 mt-2">
            Browse all our available gift categories
          </p>
        </div>
      </motion.section>

      {/* Category Selection - animate each item with staggered fade-in */}
      <section className="w-full px-4 py-10 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 md:gap-8 w-max md:w-auto p-2">
            {categoryList.map((item, index) => (
              <motion.div
                key={item.category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
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

export default GiftsPage;
