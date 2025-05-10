import { Router } from 'express';
import { getMetrics } from './metrics';

const router = Router();

router.get('/metrics', async (req, res) => {
  try {
    const metrics = await getMetrics();
    res.set('Content-Type', 'text/plain');
    res.send(metrics);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener métricas' });
  }
});

export default router; 