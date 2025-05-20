const ProductGrid = ({ books, category, subCategory }) => {
  return (
    <section className="w-full px-4 py-10 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl font-semibold mb-6">Showing all results</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book, index) => (
            <div
              key={index}
              className="h-40 bg-gray-100 flex items-center justify-center rounded"
            >
              {book}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
