'use client';

import {motion} from 'framer-motion';

export default function AnimatedItem({children, delay = 0}) {
    return (
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{
            duration: 2,
          }}
          >
            {children}
          </motion.div>
    )
}