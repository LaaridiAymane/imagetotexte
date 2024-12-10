import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export function ImageUploader({ onImageSelect }) {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles[0]) {
      onImageSelect(acceptedFiles[0]);
    }
  }, [onImageSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.bmp']
    },
    multiple: false
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        {...getRootProps()}
        className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-all duration-300 transform hover:scale-[1.02]
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400 hover:shadow-lg'}`}
      >
        <input {...getInputProps()} />
        <motion.div
          animate={{ scale: isDragActive ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
        </motion.div>
        <motion.p 
          className="mt-2 text-sm text-gray-600"
          animate={{ scale: isDragActive ? 1.05 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {isDragActive
            ? "Déposez l'image ici..."
            : "Glissez et déposez une image, ou cliquez pour sélectionner"}
        </motion.p>
        <p className="mt-1 text-xs text-gray-500">
          PNG, JPG, GIF jusqu'à 10MB
        </p>
      </div>
    </motion.div>
  );
}