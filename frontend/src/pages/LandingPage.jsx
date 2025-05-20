import { motion } from "framer-motion";
import Layout from "../layouts/Layout.jsx";
import PosterSection from "../components/landing/PosterSection.jsx";
import PromotionalText from "../components/landing/PromotionalText.jsx";
import BestSellingSection from "../components/landing/BestSellingSection.jsx";
import PopularCategories from "../components/landing/PopularCategories.jsx";
import CatalogSection from "../components/landing/CatalogSection.jsx";

const fadeInMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.5 },
};

const LandingPage = () => {
  return (
    <main className="w-full">
      <Layout>
        <motion.section {...fadeInMotion}>
          <PosterSection />
        </motion.section>

        <motion.section {...fadeInMotion}>
          <PromotionalText />
        </motion.section>

        <motion.section {...fadeInMotion}>
          <BestSellingSection />
        </motion.section>

        <motion.section {...fadeInMotion}>
          <PopularCategories />
        </motion.section>

        <motion.section {...fadeInMotion}>
          <CatalogSection />
        </motion.section>
      </Layout>
    </main>
  );
};

export default LandingPage;
