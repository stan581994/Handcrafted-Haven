import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '../../utils/db';

/**
 * API route to fetch categories data
 * 
 * @param req - Next.js API request
 * @param res - Next.js API response
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get all categories from the database
    const result = await sql`
      SELECT id, name, description, image_url
      FROM categories
      ORDER BY id ASC;
    `;
    
    // Return the categories data
    res.status(200).json({ 
      success: true, 
      data: result.rows
    });
  } catch (error) {
    console.error('API route error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred while fetching categories data',
      error: error instanceof Error ? error.message : String(error)
    });
  }
}
