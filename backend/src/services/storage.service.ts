import { getStorage } from 'firebase-admin/storage';
import { v4 as uuidv4 } from 'uuid';

const storage = getStorage();
const bucket = storage.bucket();

export const uploadImage = async (file: Express.Multer.File): Promise<string> => {
  try {
    const fileName = `${uuidv4()}-${file.originalname}`;
    const fileUpload = bucket.file(fileName);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    return new Promise((resolve, reject) => {
      stream.on('error', (error) => {
        reject(error);
      });

      stream.on('finish', async () => {
        // Hacer el archivo público
        await fileUpload.makePublic();
        
        // Obtener la URL pública
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
        resolve(publicUrl);
      });

      stream.end(file.buffer);
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Error uploading file');
  }
};

export const deleteImage = async (imageUrl: string): Promise<void> => {
  try {
    const fileName = imageUrl.split(`${bucket.name}/`)[1];
    if (!fileName) {
      throw new Error('Invalid image URL');
    }

    await bucket.file(fileName).delete();
  } catch (error) {
    console.error('Error deleting file:', error);
    throw new Error('Error deleting file');
  }
}; 