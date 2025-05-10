import { Router } from 'express';
import { 
  createArtwork,
  getArtwork,
  updateArtwork,
  deleteArtwork,
  listArtworks,
  likeArtwork,
  unlikeArtwork
} from '../controllers/artwork.controller';

const router = Router();

router.post('/', createArtwork);
router.get('/:id', getArtwork);
router.put('/:id', updateArtwork);
router.delete('/:id', deleteArtwork);
router.get('/', listArtworks);
router.post('/:id/like', likeArtwork);
router.delete('/:id/like', unlikeArtwork);

export { router as artworkRoutes }; 