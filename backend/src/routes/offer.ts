import { Router } from 'express';
import {
  createOffer,
  getOffer,
  updateOffer,
  deleteOffer,
  listOffers,
  acceptOffer,
  rejectOffer
} from '../controllers/offer.controller';

const router = Router();

router.post('/', createOffer);
router.get('/:id', getOffer);
router.put('/:id', updateOffer);
router.delete('/:id', deleteOffer);
router.get('/', listOffers);
router.post('/:id/accept', acceptOffer);
router.post('/:id/reject', rejectOffer);

export { router as offerRoutes }; 