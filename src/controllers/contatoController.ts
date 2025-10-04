import { Request, Response } from 'express';
import { db } from '../database/connection';
import { Contato, CreateContatoRequest, UpdateContatoRequest } from '../types/Contato';

export class ContatoController {
    async create(req: Request, res: Response): Promise<void> {
        try {
            const { nome, telefone }: CreateContatoRequest = req.body;
            
            const [contatoId] = await db('contatos').insert({
                nome: nome.trim(),
                telefone: telefone.trim()
            });

            const [contato] = await db('contatos').where('id', contatoId).select('*');
            
            res.status(201).json(contato);
        } catch (error) {
            console.error('Erro ao criar contato:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const contatos = await db('contatos')
                .select('*')
                .orderBy('created_at', 'desc');
            
            res.status(200).json(contatos);
        } catch (error) {
            console.error('Erro ao buscar contatos:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            
            const [contato] = await db('contatos')
                .where('id', id)
                .select('*');
            
            if (!contato) {
                res.status(404).json({ message: 'Contato não encontrado' });
                return;
            }
            
            res.status(200).json(contato);
        } catch (error) {
            console.error('Erro ao buscar contato:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const updateData: UpdateContatoRequest = req.body;
            
            const [existingContato] = await db('contatos')
                .where('id', id)
                .select('*');
            
            if (!existingContato) {
                res.status(404).json({ message: 'Contato não encontrado' });
                return;
            }

            const updateFields: Partial<Contato> = {};
            
            if (updateData.nome) {
                updateFields.nome = updateData.nome.trim();
            }
            
            if (updateData.telefone) {
                updateFields.telefone = updateData.telefone.trim();
            }

            if (Object.keys(updateFields).length === 0) {
                res.status(400).json({ message: 'Nenhum campo para atualizar' });
                return;
            }

            updateFields.updated_at = new Date();

            await db('contatos').where('id', id).update(updateFields);
            
            const [updatedContato] = await db('contatos')
                .where('id', id)
                .select('*');
            
            res.status(200).json(updatedContato);
        } catch (error) {
            console.error('Erro ao atualizar contato:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            
            const [existingContato] = await db('contatos')
                .where('id', id)
                .select('*');
            
            if (!existingContato) {
                res.status(404).json({ message: 'Contato não encontrado' });
                return;
            }

            await db('contatos').where('id', id).del();
            
            res.status(204).send();
        } catch (error) {
            console.error('Erro ao deletar contato:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
}
