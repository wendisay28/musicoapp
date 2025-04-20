require('dotenv').config();
const admin = require('firebase-admin');
const path = require('path');

// Carga automáticamente las credenciales desde el archivo JSON
const serviceAccount = require(path.resolve(process.env.FIREBASE_CREDENTIALS_PATH));

// Inicializa Firebase Admin (¡sin databaseURL necesaria para Firestore!)
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
  // Firestore detecta automáticamente tu proyecto
});

// Obtén la instancia de Firestore
const db = admin.firestore();

module.exports = db;