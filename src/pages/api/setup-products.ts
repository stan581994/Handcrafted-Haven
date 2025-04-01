import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '../../utils/db';

/**
 * API route to set up the products table and populate it with sample data
 * 
 * @param req - Next.js API request
 * @param res - Next.js API response
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Drop the existing tables if they exist
    await sql`DROP TABLE IF EXISTS products;`;
    
    // Create categories table first
    await createCategoriesTable();
    
    // Populate categories with sample data
    await populateCategoriesData();
    
    // Create the products table (which depends on categories)
    await createProductsTable();
    
    // Populate products with sample data
    await populateProductsData();
    
    res.status(200).json({ 
      success: true, 
      message: 'Products table dropped, recreated, and populated with sample data',
      created: true
    });
  } catch (error) {
    console.error('API route error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred while setting up the products table',
      error: error instanceof Error ? error.message : String(error)
    });
  }
}

/**
 * Create the products table
 */
async function createProductsTable() {
  try {
    await sql`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        image_url VARCHAR(255),
        category_id INTEGER NOT NULL,
        artisan_id INTEGER NOT NULL,
        stock_quantity INTEGER NOT NULL DEFAULT 1,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories(id),
        FOREIGN KEY (artisan_id) REFERENCES artisans(id)
      );
    `;
    
    console.log('Products table created successfully');
  } catch (error) {
    console.error('Error creating products table:', error);
    throw error;
  }
}

/**
 * Create the categories table
 */
async function createCategoriesTable() {
  try {
    // Check if the table already exists
    const tableExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'categories'
      );
    `;
    
    if (!tableExists.rows[0].exists) {
      await sql`
        CREATE TABLE categories (
          id SERIAL PRIMARY KEY,
          name VARCHAR(50) NOT NULL,
          description TEXT NOT NULL,
          image_url VARCHAR(255),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `;
      console.log('Categories table created successfully');
    } else {
      console.log('Categories table already exists');
    }
  } catch (error) {
    console.error('Error with categories table:', error);
    throw error;
  }
}

/**
 * Populate the categories table with sample data
 */
async function populateCategoriesData() {
  try {
    // Check if categories already exist
    const categoriesCount = await sql`SELECT COUNT(*) FROM categories;`;
    
    if (parseInt(categoriesCount.rows[0].count) > 0) {
      console.log('Categories already populated, skipping');
      return;
    }
    
    // Sample categories data
    const categories = [
      {
        name: 'Jewelry',
        description: 'Handcrafted necklaces, bracelets, earrings, and more.',
        image_url: '/jewerly.jpg'
      },
      {
        name: 'Home Decor',
        description: 'Beautiful items to decorate your living space.',
        image_url: '/decor.jpg'
      },
      {
        name: 'Clothing',
        description: 'Handmade clothing items crafted with care.',
        image_url: '/clothing.jpg'
      }
    ];
    
    // Insert each category
    for (const category of categories) {
      await sql`
        INSERT INTO categories (name, description, image_url)
        VALUES (${category.name}, ${category.description}, ${category.image_url});
      `;
    }
    
    console.log('Sample categories data inserted successfully');
  } catch (error) {
    console.error('Error populating categories table:', error);
    throw error;
  }
}

/**
 * Populate the products table with sample data
 */
async function populateProductsData() {
  try {
    // Get all artisans
    const artisansResult = await sql`SELECT id, specialty FROM artisans;`;
    const artisans = artisansResult.rows;
    
    // Get all categories
    const categoriesResult = await sql`SELECT id, name FROM categories;`;
    const categories = categoriesResult.rows;
    
    // Find category IDs
    const jewelryCategoryId = categories.find(c => c.name === 'Jewelry')?.id;
    const homeDecorCategoryId = categories.find(c => c.name === 'Home Decor')?.id;
    const clothingCategoryId = categories.find(c => c.name === 'Clothing')?.id;
    
    // Sample products data
    const products = [
      // Emma Johnson - Jewelry Designer
      {
        name: 'Handcrafted Silver Necklace',
        description: 'A beautiful silver necklace with a handcrafted pendant.',
        price: 89.99,
        image_url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
        category_id: jewelryCategoryId,
        artisan_id: artisans.find(a => a.specialty === 'Jewelry Designer')?.id,
        stock_quantity: 15
      },
      {
        name: 'Gemstone Earrings',
        description: 'Elegant earrings featuring ethically sourced gemstones.',
        price: 64.99,
        image_url: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
        category_id: jewelryCategoryId,
        artisan_id: artisans.find(a => a.specialty === 'Jewelry Designer')?.id,
        stock_quantity: 20
      },
      {
        name: 'Beaded Bracelet Set',
        description: 'Set of three handcrafted beaded bracelets that can be worn together or separately.',
        price: 45.99,
        image_url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        category_id: jewelryCategoryId,
        artisan_id: artisans.find(a => a.specialty === 'Jewelry Designer')?.id,
        stock_quantity: 25
      },
      
      // Michael Chen - Woodworker
      {
        name: 'Handcrafted Wooden Bowl',
        description: 'A beautiful wooden bowl perfect for serving or decoration.',
        price: 79.99,
        image_url: 'https://images.unsplash.com/photo-1605883705077-8d3d3cebe78c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
        category_id: homeDecorCategoryId,
        artisan_id: artisans.find(a => a.specialty === 'Woodworker')?.id,
        stock_quantity: 10
      },
      {
        name: 'Wooden Wall Art',
        description: 'Geometric wooden wall art to add warmth and style to any room.',
        price: 129.99,
        image_url: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
        category_id: homeDecorCategoryId,
        artisan_id: artisans.find(a => a.specialty === 'Woodworker')?.id,
        stock_quantity: 8
      },
      {
        name: 'Wooden Coasters (Set of 4)',
        description: 'Handcrafted wooden coasters with unique grain patterns.',
        price: 34.99,
        image_url: 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
        category_id: homeDecorCategoryId,
        artisan_id: artisans.find(a => a.specialty === 'Woodworker')?.id,
        stock_quantity: 30
      },
      
      // Sophia Martinez - Textile Artist
      {
        name: 'Hand-Woven Scarf',
        description: 'A beautiful hand-woven scarf made with natural fibers.',
        price: 59.99,
        image_url: 'https://images.unsplash.com/photo-1601379327928-bedfaf9da2d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
        category_id: clothingCategoryId,
        artisan_id: artisans.find(a => a.specialty === 'Textile Artist')?.id,
        stock_quantity: 12
      },
      {
        name: 'Embroidered Pillow Cover',
        description: 'Hand-embroidered pillow cover with traditional patterns.',
        price: 49.99,
        image_url: 'https://images.unsplash.com/photo-1584346133934-a3a4db9b4b53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
        category_id: homeDecorCategoryId,
        artisan_id: artisans.find(a => a.specialty === 'Textile Artist')?.id,
        stock_quantity: 15
      },
      {
        name: 'Handwoven Table Runner',
        description: 'Elegant table runner handwoven with natural cotton.',
        price: 69.99,
        image_url: 'https://images.unsplash.com/photo-1584346138321-8a3920b6b64c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
        category_id: homeDecorCategoryId,
        artisan_id: artisans.find(a => a.specialty === 'Textile Artist')?.id,
        stock_quantity: 10
      },
      
      // James Wilson - Ceramicist
      {
        name: 'Ceramic Vase',
        description: 'Handcrafted ceramic vase with a unique glaze finish.',
        price: 69.99,
        image_url: 'https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
        category_id: homeDecorCategoryId,
        artisan_id: artisans.find(a => a.specialty === 'Ceramicist')?.id,
        stock_quantity: 8
      },
      {
        name: 'Ceramic Mug Set',
        description: 'Set of four handcrafted ceramic mugs, each with a unique design.',
        price: 89.99,
        image_url: 'https://images.unsplash.com/photo-1590422749897-47726d85ebb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
        category_id: homeDecorCategoryId,
        artisan_id: artisans.find(a => a.specialty === 'Ceramicist')?.id,
        stock_quantity: 12
      },
      {
        name: 'Ceramic Planter',
        description: 'Handcrafted ceramic planter perfect for small houseplants.',
        price: 54.99,
        image_url: 'https://images.unsplash.com/photo-1600330268264-8ea64072a07d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
        category_id: homeDecorCategoryId,
        artisan_id: artisans.find(a => a.specialty === 'Ceramicist')?.id,
        stock_quantity: 15
      },
      
      // Olivia Taylor - Leather Artisan
      {
        name: 'Leather Wallet',
        description: 'Handcrafted leather wallet with multiple card slots and a bill compartment.',
        price: 79.99,
        image_url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
        category_id: clothingCategoryId,
        artisan_id: artisans.find(a => a.specialty === 'Leather Artisan')?.id,
        stock_quantity: 20
      },
      {
        name: 'Leather Journal',
        description: 'Handcrafted leather journal with high-quality paper.',
        price: 59.99,
        image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
        category_id: homeDecorCategoryId,
        artisan_id: artisans.find(a => a.specialty === 'Leather Artisan')?.id,
        stock_quantity: 15
      },
      {
        name: 'Leather Tote Bag',
        description: 'Stylish and durable handcrafted leather tote bag.',
        price: 149.99,
        image_url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=738&q=80',
        category_id: clothingCategoryId,
        artisan_id: artisans.find(a => a.specialty === 'Leather Artisan')?.id,
        stock_quantity: 10
      }
    ];
    
    // Insert each product
    for (const product of products) {
      await sql`
        INSERT INTO products (name, description, price, image_url, category_id, artisan_id, stock_quantity)
        VALUES (${product.name}, ${product.description}, ${product.price}, ${product.image_url}, ${product.category_id}, ${product.artisan_id}, ${product.stock_quantity});
      `;
    }
    
    console.log('Sample products data inserted successfully');
  } catch (error) {
    console.error('Error populating products table:', error);
    throw error;
  }
}
