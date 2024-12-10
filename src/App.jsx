import { useState } from 'react';
import { motion } from 'framer-motion';
import { ImageUploader } from './components/ImageUploader';
import { TextOutput } from './components/TextOutput';
import { extractTextFromImage } from './utils/ocrUtils';

function App() {
  const [extractedText, setExtractedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageSelect = async (file) => {
    try {
      setIsProcessing(true);
      setSelectedImage(URL.createObjectURL(file));
      const text = await extractTextFromImage(file);
      setExtractedText(text);
    } catch (error) {
      alert('Erreur lors de l\'extraction du texte. Veuillez réessayer.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <motion.div 
        className="max-w-3xl mx-auto px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1 
          className="text-4xl font-bold text-center text-gray-900 mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Extracteur de Texte depuis Image
        </motion.h1>
        
        <motion.p
          className="text-center text-gray-600 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Transformez vos images en texte en quelques secondes
        </motion.p>
        
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-8 backdrop-blur-sm bg-opacity-90"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ImageUploader onImageSelect={handleImageSelect} />
          
          {selectedImage && (
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-medium text-gray-900 mb-4">Image sélectionnée:</h3>
              <motion.div
                className="relative rounded-lg overflow-hidden shadow-md"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="max-h-[300px] w-full object-contain bg-gray-50"
                />
              </motion.div>
            </motion.div>
          )}
          
          <TextOutput text={extractedText} isProcessing={isProcessing} />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default App;