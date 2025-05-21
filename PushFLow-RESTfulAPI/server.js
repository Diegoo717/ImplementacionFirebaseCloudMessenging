require('dotenv').config();
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
app.use(cors());
app.use(express.json());

app.post('/send-to-device', async (req, res) => {
  try {
    const { token, title, body, data } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'El token FCM es obligatorio' });
    }

    const message = {
      notification: { title, body },
      data: data || {},  
      token: token       
    };

    const response = await admin.messaging().send(message);

    res.json({ 
      success: true,
      messageId: response 
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor FCM corriendo en http://localhost:${PORT}`);
});