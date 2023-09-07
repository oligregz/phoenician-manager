import { Request, Response } from 'express'; 
import { prisma } from '../database';

let updateProducts = [];

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
  async updateProduct(req: Request, res: Response) {
    try {
      const { code, name, costprice, salesprice } = req.body;

      const productExsists = await prisma.product.findUnique({
        where: {
          code: Number(code)
        }
      });

      if (!productExsists) {
        return res.json({
          error: true,
          message: 'Error: Product not found!',
        });
      }

      const updatedData: Record<string, unknown> = {}; 
      if (name !== undefined) {
        updatedData.name = name;
      }
      if (costprice !== undefined) {
        updatedData.costprice = costprice;
      }
      if (salesprice !== undefined) {
        updatedData.salesprice = salesprice;
      }

      const updatedProduct = await prisma.product.update({
        where: {
          code: Number(code)
        },
        data: updatedData
      });

      // keep updated product
      updateProducts = [];
      updateProducts.push({
        product: {
          code: updatedProduct.code.toString(),
          name: updatedProduct.name,
          costprice: updatedProduct.costprice,
          salesprice: updatedProduct.salesprice
        }
      });

      return res
        .status(200)
        .json({
          error: false,
          message: 'Success: Updated product!',
          product: {
            code: updatedProduct.code.toString(),
            name: updatedProduct.name,
            costprice: updatedProduct.costprice,
            salesprice: updatedProduct.salesprice
          }
        });

    } catch (e) {
      return res.status(500).json({ message: `Error: ${e.message}` });
    }
  },
  async getProduct(req: Request, res: Response) {
    try {
      const { code } = req.params;
      const product = await prisma.product.findUnique({
        where: {
          code: Number(code)
        }
      });

      if (!product) {
        return res.json({
          error: true,
          message: 'Error: Product not found!',
        });
      }

      return res
        .status(200)
        .json({
          error: false,
          message: 'Success: Get product!',
          product: {
            code: product.code.toString(),
            name: product.name,
            costprice: product.costprice,
            salesprice: product.salesprice
          },
        });

    } catch (e) {
      return res.status(500).json({ message: `Error: ${e.message}` });
    }
  },

  async getUpdatedProducts(req: Request, res: Response) {
    try {
      if (updateProducts.length === 0) {
        return res
          .status(500)
          .json({
            error: true,
            message: 'Error: Product update not found!'
          });
      }
      res
        .status(200)
        .json({
          error: false,
          message: 'Success: List of updated products',
          products: updateProducts
        });

      // updateProducts = [];

    } catch (e) {
      return res
        .status(500)
        .json({ message: `Error: ${e.message}` });
    }
  }
};