import {motion} from 'framer-motion';

const pageVariants = {
    initial: {opacity: 0, y: '100%'},
    in: {opacity: 1, y: 0},
    out: {opacity: 0, y: 600}
};

const pageTransition = {
    type: "tween",
    duration: 0.3,
    ease: "easeInOut"
};

const UpAnim = ({children}: { children: React.ReactNode }) => (
    <motion.div
        style={{width: '100%'}}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
    >
        {children}
    </motion.div>
);

export default UpAnim;