import { forwardRef } from 'react';
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const AnimatedSection = forwardRef(({ children, id }, ref) => {
    return (
        <motion.section
            ref={ref}
            id={id}
            className="py-16 sm:py-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeInOut'}}
        >
            {children}
        </motion.section>
    );
});

AnimatedSection.displayName = 'AnimatedSection'

AnimatedSection.propTypes = {
    children: PropTypes.node,
    id: PropTypes.string,
};

export default AnimatedSection;