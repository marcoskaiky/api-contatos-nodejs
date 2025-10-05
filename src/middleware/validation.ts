import { Request, Response, NextFunction } from 'express';

const isValidName = (value: unknown): boolean => {
  if (typeof value !== 'string') return false;
  const words = value.trim().split(/\s+/);
  if (words.length < 2) return false;
  for (const w of words) if (w.length < 3) return false;
  return true;
};

export const validateCreateContato = (req: Request, res: Response, next: NextFunction) => {
  const { nome, telefone } = req.body ?? {};
  if (!isValidName(nome)) {
    return res.status(400).json({ message: 'Nome inválido' });
  }
  if (typeof telefone !== 'string' || telefone.length < 8 || telefone.length > 20) {
    return res.status(400).json({ message: 'Telefone inválido' });
  }
  next();
};

export const validateUpdateContato = (req: Request, res: Response, next: NextFunction) => {
  const { nome, telefone } = req.body ?? {};
  if (nome !== undefined && !isValidName(nome)) {
    return res.status(400).json({ message: 'Nome inválido' });
  }
  if (telefone !== undefined && (typeof telefone !== 'string' || telefone.length < 8 || telefone.length > 20)) {
    return res.status(400).json({ message: 'Telefone inválido' });
  }
  next();
};


