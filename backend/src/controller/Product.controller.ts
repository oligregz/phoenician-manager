import { Request, Response } from 'express'; 
import { prisma } from '../database';



export default {
  async createProduct(req: Request, res: Response) {
    `Este código cadastra o produto mas retorna o message 
    {
      "message": "Error: Do not know how to serialize a BigInt"
    }
    `;
    try {
      const { code, name, costprice, salesprice } = req.body;

      const codeNumber = parseInt(code, 10);

      const alreadyExists = await prisma.product.findUnique({
        where: {
          code: codeNumber
        },
      });

      if(alreadyExists) {
        return res.json({
          error: true,
          message: 'Error: Product alerady exists!'
        });
      }

      const product = await prisma.product.create({
        data: {
          code: codeNumber,
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
      return res.json({ message: `Error: ${e.message}` });
    }
  }
};