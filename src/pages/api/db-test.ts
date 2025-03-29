import { NextApiRequest, NextApiResponse } from 'next';
import { testConnection, sql } from '../../utils/db';

/**
 * API route to test database connection
 * 
 * @param req - Next.js API request
 * @param res - Next.js API response
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Test the database connection
    const isConnected = await testConnection();
    
    if (isConnected) {
      // If connected, return success message
      res.status(200).json({ 
        success: true, 
        message: 'Database connection successful',
        timestamp: new Date().toISOString()
      });
    } else {
      // If connection failed, return error
      res.status(500).json({ 
        success: false, 
        message: 'Database connection failed' 
      });
    }
  } catch (error) {
    console.error('API route error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred while testing the database connection',
      error: error instanceof Error ? error.message : String(error)
    });
  }
}
