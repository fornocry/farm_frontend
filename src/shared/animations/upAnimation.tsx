import {motion} from 'framer-motion';

const pageVariants = {
    initial: {opacity: 0, y: 1200},
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
        style={{ width: '100%' }}
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
    >
        {children}
    </motion.div>
);

export default UpAnim;