import { Router } from 'express';
import {
  createComment,
  getComment,
  updateComment,
  deleteComment,
  listComments
} from '../controllers/comment.controller';

const router = Router();

router.post('/', createComment);
router.get('/:id', getComment);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);
router.get('/', listComments);

export { router as commentRoutes }; 