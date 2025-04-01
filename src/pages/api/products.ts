import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '../../utils/db';

/**
 * API route to fetch products data with optional filtering
 * 
 * @param req - Next.js API request
 * @param res - Next.js API response
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { artisan_id, category_id } = req.query;
    
    // Build the query based on filters
    let query = `
      SELECT 
        p.id, 
        p.name, 
        p.description, 
        p.price, 
        p.image_url, 
        p.stock_quantity,
        p.category_id,
        p.artisan_id,
        c.name as category_name,
        a.name as artisan_name,
        a.specialty as artisan_specialty
      FROM products p
      JOIN categories c ON p.category_id = c.id
      JOIN artisans a ON p.artisan_id = a.id
    `;
    
    const queryParams: any[] = [];
    const conditions: string[] = [];
    
    // Add filter conditions if provided
    if (artisan_id) {
      conditions.push(`p.artisan_id = $${queryParams.length + 1}`);
      queryParams.push(artisan_id);
    }
    
    if (category_id) {
      conditions.push(`p.category_id = $${queryParams.length + 1}`);
      queryParams.push(category_id);
    }
    
    // Add WHERE clause if there are conditions
    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }
    
    // Add ordering
    query += ` ORDER BY p.id ASC`;
    
    // Execute the query
    const result = await sql.query(query, queryParams);
    
    // Return the products data
    res.status(200).json({ 
      success: true, 
      data: result.rows
    });
  } catch (error) {
    console.error('API route error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred while fetching products data',
      error: error instanceof Error ? error.message : String(error)
    });
  }
}
