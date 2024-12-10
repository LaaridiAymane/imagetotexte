import { createWorker } from 'tesseract.js';

export async function extractTextFromImage(imageFile) {
  const worker = await createWorker('fra');
  
  try {
    const { data: { text } } = await worker.recognize(imageFile);
    await worker.terminate();
    return text;
  } catch (error) {
    console.error('Erreur lors de l\'extraction du texte:', error);
    await worker.terminate();
    throw error;
  }
}