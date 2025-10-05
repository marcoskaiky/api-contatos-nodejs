import { Router, Request, Response } from 'express';
import { ContatoController } from '../controllers/contatoController';
import { validateCreateContato, validateUpdateContato } from '../middleware/validation';

const router = Router();
const contatoController = new ContatoController();

router.post('/', validateCreateContato, (req: Request, res: Response) => {
  contatoController.create(req, res);
});

router.get('/', (req: Request, res: Response) => {
  contatoController.getAll(req, res);
});

router.get('/:id', (req: Request, res: Response) => {
  contatoController.getById(req, res);
});

router.patch('/:id', validateUpdateContato, (req: Request, res: Response) => {
  contatoController.update(req, res);
});

router.delete('/:id', (req: Request, res: Response) => {
  contatoController.delete(req, res);
});

export { router as contatoRoutes };


