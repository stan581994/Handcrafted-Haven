import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '../../utils/db';

/**
 * API route to fetch artisans data
 * 
 * @param req - Next.js API request
 * @param res - Next.js API response
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get all artisans from the database
    const result = await sql`
      SELECT id, name, specialty, description, image_url
      FROM artisans
      ORDER BY id ASC;
    `;
    
    // Return the artisans data
    res.status(200).json({ 
      success: true, 
      data: result.rows
    });
  } catch (error) {
    console.error('API route error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred while fetching artisans data',
      error: error instanceof Error ? error.message : String(error)
    });
  }
}
