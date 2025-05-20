import { useEffect, useState } from "react";

const statements = [
  "Enhance your workspace with high-quality stationery.",
  "Unwrap happiness — shop our exclusive gift collection.",
  "Gear up for action with quality sports accessories.",
  "Discover books that fuel both your studies and your imagination.",
];

const Typewriter = () => {
  const [text, setText] = useState("");
  const [statementIndex, setStatementIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(100); // Typing speed

  useEffect(() => {
    const currentStatement = statements[statementIndex];
    let timeout;

    if (isDeleting) {
      timeout = setTimeout(() => {
        setText((prev) => prev.slice(0, -1));
        setSpeed(40); // Faster when deleting
      }, speed);
    } else {
      timeout = setTimeout(() => {
        setText((prev) => currentStatement.slice(0, prev.length + 1));
        setSpeed(100); // Normal typing speed
      }, speed);
    }

    if (!isDeleting && text === currentStatement) {
      timeout = setTimeout(() => setIsDeleting(true), 1500); // Pause before deleting
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setStatementIndex((prev) => (prev + 1) % statements.length); // Next statement
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, statementIndex, speed]);

  return (
    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800">
      {text}
      <span className="border-r-2 border-gray-800 animate-pulse ml-1"></span>
    </h1>
  );
};

const PromotionalText = () => {
  return (
    <section className="w-full bg-white px-4 py-16 md:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <Typewriter />
      </div>
    </section>
  );
};

export default PromotionalText;
