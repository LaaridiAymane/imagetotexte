import { motion, AnimatePresence } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export function TextOutput({ text, isProcessing }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-6"
    >
      <motion.h3 
        className="text-lg font-medium text-gray-900 mb-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        Texte extrait:
      </motion.h3>
      <AnimatePresence mode="wait">
        {isProcessing ? (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <Skeleton count={3} />
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-6 min-h-[200px] whitespace-pre-wrap shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md"
          >
            {text || "Le texte extrait apparaîtra ici..."}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}