import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Splash({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center"
      >
        <h1 className="text-7xl font-bold text-white tracking-[0.2em]">
          ARTMENTED
        </h1>
        <motion.div
          className="mt-4 h-1 bg-white mx-auto"
          initial={{ width: 0 }}
          animate={{ width: '200px' }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
      </motion.div>
    </motion.div>
  );
}