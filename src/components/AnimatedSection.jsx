// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

function AnimatedSection({ children, id }) {
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="py-16 md:py-24"
        >
            {children}
        </motion.section>
    );
}

export default AnimatedSection