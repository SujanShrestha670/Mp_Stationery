const CategoryCard = ({ category, title, icon, selectedCategory, onClick }) => {
  const isSelected = selectedCategory === category;
  const isNonAcademic = category === "non-academic";

  return (
    <div
      className="flex flex-col items-center cursor-pointer transition-transform hover:scale-105"
      onClick={() => onClick(category)}
    >
      <div
        className={`
          flex items-center justify-center text-center font-medium rounded-full
          w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24
          text-xl sm:text-2xl md:text-3xl
          ${
            isNonAcademic
              ? "bg-blue-100 text-blue-600"
              : "bg-green-100 text-green-600"
          }
          ${isSelected ? "ring-4 ring-blue-400" : ""}
        `}
      >
        {icon}
      </div>
      <span className="mt-2 text-xs sm:text-sm md:text-base font-medium text-center">
        {title}
      </span>
    </div>
  );
};

export default CategoryCard;
