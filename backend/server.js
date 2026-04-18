import express from 'express';
import { generarContenidoEducativo } from './services/GeminiServices.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.get('/', (req, res) => {
  res.send('El servidor está vivo y escuchando');
});

app.post("/api/generar-estudio", async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: 'Se requiere el campo "content"' });
    }
    const result = await generarContenidoEducativo(content);
    console.log(result)
    res.json(result);
  } catch (error) {
    console.error('Error en la API:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});