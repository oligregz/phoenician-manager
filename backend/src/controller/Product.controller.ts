import { Request, Response } from 'express'; 
import { prisma } from '../database';

export default {
  async createProduct(req: Request, res: Response) {
    try {
      const { code, name, costprice, salesprice } = req.body;

      const codeNumber = BigInt(code);

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
        product: {
          ...product,
          code: product.code.toString()
        }
      });

    } catch (e) {
      return res
        .status(500)
        .json({ message: `Error: ${e.message}` });
    }
  },
  async listProducts(req: Request, res: Response) {
    try {

      const products = await prisma.product.findMany();

      if (!products || products.length === 0) {
        return res.json({
          error: true,
          message: 'Error: Products not found!',
        });
      }

      const serializedProducts = products.map((product) => ({
        code: product.code.toString(),
        name: product.name,
        costprice: product.costprice,
        salesprice: product.salesprice
      }));

      return res
        .status(200)
        .json({
          error: false,
          message: 'Success: List products!',
          products: serializedProducts,
        });

    } catch (e) {
      return res.status(500).json({ message: `Error: ${e.message}` });
    }
  },
};