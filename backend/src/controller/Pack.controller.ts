import { prisma } from '../database';
import { Request, Response } from 'express';

export default {
  async createPack(req: Request, res: Response) {
    try {
      const { pack_id, product_id, qty } = req.body;

      const packId = BigInt(pack_id);
      const productId = BigInt(product_id);
      const quantity = BigInt(qty);

      const alreadyExists = await prisma.pack.findFirst({
        where: {
          pack_id: packId,
          product_id: productId,
          qty: quantity,
        },
      });

      if (alreadyExists) {
        return res.json({
          error: true,
          message: 'Error: Product already exists!',
        });
      }

      const pack = await prisma.pack.create({
        data:{
          pack_id: packId,
          product_id: productId,
          qty: qty
        }
      });


      return res.json({
        error: false,
        message: 'Success: Pack registered!',
        pack: {
          ...pack,
          id: pack.id.toString(),
          pack_id: pack.pack_id.toString(),
          product_id: pack.product_id.toString(),
          qty: pack.qty.toString()
        }
      });
    } catch (e) {
      return res.status(500).json({ message: `Error: ${e.message}` });
    }
  },
};
