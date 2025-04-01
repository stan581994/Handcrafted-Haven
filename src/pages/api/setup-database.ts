import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '../../utils/db';
import setupArtisansHandler from './setup-artisans';
import setupProductsHandler from './setup-products';

/**
 * API route to set up the entire database with sample data
 * 
 * @param req - Next.js API request
 * @param res - Next.js API response
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Define response type
    type ApiResponse = {
      success: boolean;
      message: string;
      [key: string]: any;
    };

    // Create mock response objects to capture results
    const artisansResult = {
      statusCode: 0,
      body: {} as ApiResponse,
      status: function(code: number) {
        this.statusCode = code;
        return this;
      },
      json: function(data: any) {
        this.body = data;
        return this;
      }
    };

    const productsResult = {
      statusCode: 0,
      body: {} as ApiResponse,
      status: function(code: number) {
        this.statusCode = code;
        return this;
      },
      json: function(data: any) {
        this.body = data;
        return this;
      }
    };

    // Setup artisans
    await setupArtisansHandler(req, artisansResult as any);
    
    if (!artisansResult.body.success) {
      throw new Error(`Failed to setup artisans: ${artisansResult.body.message}`);
    }
    
    // Setup products
    await setupProductsHandler(req, productsResult as any);
    
    if (!productsResult.body.success) {
      throw new Error(`Failed to setup products: ${productsResult.body.message}`);
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Database setup completed successfully',
      artisans: artisansResult.body,
      products: productsResult.body
    });
  } catch (error) {
    console.error('API route error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred while setting up the database',
      error: error instanceof Error ? error.message : String(error)
    });
  }
}
