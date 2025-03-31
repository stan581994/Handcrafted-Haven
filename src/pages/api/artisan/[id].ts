import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '../../../utils/db';

/**
 * API route to fetch a single artisan by ID
 * 
 * @param req - Next.js API request
 * @param res - Next.js API response
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    
    if (!id || Array.isArray(id)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid artisan ID'
      });
    }

    // Get the artisan from the database
    const result = await sql`
      SELECT id, name, specialty, description, image_url, created_at, updated_at
      FROM artisans
      WHERE id = ${id};
    `;
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: `Artisan with ID ${id} not found`
      });
    }

    // Return the artisan data
    res.status(200).json({ 
      success: true, 
      data: result.rows[0]
    });
  } catch (error) {
    console.error('API route error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred while fetching artisan data',
      error: error instanceof Error ? error.message : String(error)
    });
  }
}
