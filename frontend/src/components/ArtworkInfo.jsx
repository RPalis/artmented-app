import { motion } from 'framer-motion';

export default function ArtworkInfo({ artwork, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-90 flex items-end z-40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white w-full rounded-t-3xl p-8 max-h-[80vh] overflow-y-auto"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25 }}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-8 text-2xl text-gray-600 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold mb-3">{artwork.title}</h2>
        <p className="text-gray-600 mb-6">
          {artwork.year} • {artwork.medium}
        </p>
        <p className="text-gray-800 leading-relaxed text-lg">
          {artwork.description}
        </p>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">By {artwork.artist_name}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
