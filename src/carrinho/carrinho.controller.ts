import { Request, Response } from 'express';
import { db } from '../database/banco-mongo.js';

interface ItemCarrinho {
    produtoId: string;
    quantidade: number;
    precoUnitario: number;
    nome: string;
}

interface Carrinho {
    usuarioId: string;
    itens: ItemCarrinho[];
    dataAtualizacao: Date;
    total: number;
}


class CarrinhoController {
    //adicionarItem
    //removerItem
    //atualizarQuantidade
    //listar
    //remover

    async adicionarItem(req: Request, res: Response) {
        const { produtoId, quantidade, precoUnitario, nome } = req.body;

        if (!produtoId || !quantidade || !precoUnitario || !nome) {
            return res.status(400).json({ erro: 'Dados obrigatórios faltando.' });
        }

        const item: ItemCarrinho = { produtoId, quantidade, precoUnitario, nome };
        await db.collection('carrinho').insertOne(item);

        res.status(201).json({ mensagem: 'Item adicionado ao carrinho', item });
    }

    async removerItem(req: Request, res: Response) {
        const { produtoId } = req.body;
        if (!produtoId) {
            return res.status(400).json({ erro: 'produtoId é obrigatório.' });
        }

        try {
            const resultado = await db.collection('carrinho').deleteOne({ produtoId });
            if (resultado.deletedCount === 0) {
                return res.status(404).json({ erro: 'Item não encontrado no carrinho.' });
            }
            res.status(200).json({ mensagem: 'Item removido do carrinho.' });
        } catch (error) {
            res.status(500).json({ erro: 'Erro ao remover item do carrinho.' });
        }
    }

    async atualizarQuantidade(req: Request, res: Response) {
        const { produtoId, quantidade } = req.body;
        if (!produtoId || typeof quantidade !== 'number' || quantidade < 1) {
            return res.status(400).json({ erro: 'produtoId e quantidade válida são obrigatórios.' });
        }

        try {
            const resultado = await db.collection('carrinho').updateOne(
                { produtoId },
                { $set: { quantidade } }
            );
            if (resultado.matchedCount === 0) {
                return res.status(404).json({ erro: 'Item não encontrado no carrinho.' });
            }
            res.status(200).json({ mensagem: 'Quantidade atualizada com sucesso.' });
        } catch (error) {
            res.status(500).json({ erro: 'Erro ao atualizar quantidade do item.' });
        }
    }

    async listar(req: Request, res: Response) {
        try {
            const itens = await db.collection('carrinho').find().toArray();
            res.status(200).json(itens);
        } catch (error) {
            res.status(500).json({ erro: 'Erro ao listar itens do carrinho' });
        }
    }

    async remover(req: Request, res: Response) {
        const { usuarioId } = req.body;
        if (!usuarioId) {
            return res.status(400).json({ erro: 'usuarioId é obrigatório.' });
        }

        try {
            const resultado = await db.collection('carrinho').deleteMany({ usuarioId });
            if (resultado.deletedCount === 0) {
                return res.status(404).json({ erro: 'Carrinho não encontrado.' });
            }
            res.status(200).json({ mensagem: 'Carrinho removido com sucesso.' });
        } catch (error) {
            res.status(500).json({ erro: 'Erro ao remover o carrinho.' });
        }
    }
}


export default new CarrinhoController();