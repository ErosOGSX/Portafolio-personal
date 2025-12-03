import { forwardRef } from 'react';
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const AnimatedSection = forwardRef(({ children, id }, ref) => {
    return (
        <motion.section
            ref={ref}
            id={id}
            className="py-16 sm:py-20"
            initial={{
                opacity: 0,
                y: 80,
                scale: 0.85,
                rotate: -8,
                filter: 'blur(12px)'
            }}
            whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
                rotate: 0,
                filter: 'blur(0px)'
            }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1]
            }}
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