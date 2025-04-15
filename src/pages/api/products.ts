import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '../../utils/db';
import { getToken } from 'next-auth/jwt';

/**
 * API route to fetch products data with optional filtering
 * 
 * @param req - Next.js API request
 * @param res - Next.js API response
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check the HTTP method
  switch (req.method) {
    case 'GET':
      return getProducts(req, res);
    case 'POST':
      return createProduct(req, res);
    case 'PUT':
      return updateProduct(req, res);
    case 'DELETE':
      return deleteProduct(req, res);
    default:
      return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}

/**
 * Get products with optional filtering
 */
async function getProducts(req: NextApiRequest, res: NextApiResponse) {
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
      message: 'An error occurred while deleting the product',
      error: error instanceof Error ? error.message : String(error)
    });
  }
}

/**
 * Create a new product (admin only)
 */
async function createProduct(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Check if user is authenticated and is an admin
    const token = await getToken({ req });
    if (!token || (token as any).role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    
    const { name, description, price, image_url, stock_quantity, category_id, artisan_id } = req.body;
    
    // Validate required fields
    if (!name || !description || price === undefined || stock_quantity === undefined || !category_id || !artisan_id) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    
    // Insert the new product
    const result = await sql.query(
      `INSERT INTO products (name, description, price, image_url, stock_quantity, category_id, artisan_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id`,
      [name, description, price, image_url, stock_quantity, category_id, artisan_id]
    );
    
    res.status(201).json({ 
      success: true, 
      message: 'Product created successfully',
      data: { id: result.rows[0].id }
    });
  } catch (error) {
    console.error('API route error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred while creating the product',
      error: error instanceof Error ? error.message : String(error)
    });
  }
}

/**
 * Update an existing product (admin only)
 */
async function updateProduct(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Check if user is authenticated and is an admin
    const token = await getToken({ req });
    if (!token || (token as any).role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    
    const { id } = req.query;
    const { name, description, price, image_url, stock_quantity, category_id, artisan_id } = req.body;
    
    // Validate required fields
    if (!id || !name || !description || price === undefined || stock_quantity === undefined || !category_id || !artisan_id) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    
    // Update the product
    const result = await sql.query(
      `UPDATE products 
       SET name = $1, description = $2, price = $3, image_url = $4, stock_quantity = $5, category_id = $6, artisan_id = $7
       WHERE id = $8
       RETURNING id`,
      [name, description, price, image_url, stock_quantity, category_id, artisan_id, id]
    );
    
    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Product updated successfully',
      data: { id: result.rows[0].id }
    });
  } catch (error) {
    console.error('API route error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred while updating the product',
      error: error instanceof Error ? error.message : String(error)
    });
  }
}

/**
 * Delete a product (admin only)
 */
async function deleteProduct(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Check if user is authenticated and is an admin
    const token = await getToken({ req });
    if (!token || (token as any).role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    
    const { id } = req.query;
    
    if (!id) {
      return res.status(400).json({ success: false, message: 'Product ID is required' });
    }
    
    // Delete the product
    const result = await sql.query('DELETE FROM products WHERE id = $1', [id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Product deleted successfully'
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
