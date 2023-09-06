import { Request, Response } from 'express'; 
import { prisma } from '../database';

export default {
  async createProduct(req: Request, res: Response) {
    try {
      const { code, name, costprice, salesprice } = req.body;
      const alreadyExists = await prisma.product.findUnique({
        where: code,
      });

      if(alreadyExists) {
        return res.json({
          error: true,
          message: 'Error: Product alerady exists!'
        });
      }

      const product = await prisma.product.create({
        data: {
          code,
          name,
          costprice,
          salesprice
        }
      });

      return res.json({
        error: false,
        message: 'Success: Product registered!',
        product
      });

    } catch (e) {
      return res.json({ message: e.message });
    }
  }
};