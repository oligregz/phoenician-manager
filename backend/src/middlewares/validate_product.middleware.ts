import { Request, Response } from 'express';
export const validateProduct = (req: Request, res: Response, next) => {
  try {
    const { costprice, salesprice } = req.body;

    if (!salesprice) {
      throw new Error('Error assigning "salesprice" field');
    }
    
    if (salesprice < costprice) {
      throw new Error('Selling price less than cost price');
    }    

    // const diferencePrice = Math.abs(costprice - salesprice);
    // const maxAdjustmentPercentage = costprice * 0.1;

    // if (diferencePrice > maxAdjustmentPercentage) {
    //   throw new Error('Adjustment of 10% of the extrapolated price for more or less');
    // }

    next();
  
  } catch (e) {
    return next(res.json({
      message: `Data_Validation_Exception: ${e.message}`
    }));
  }
};