import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '../../utils/db';

/**
 * API route to set up the artisans table and populate it with sample data
 * 
 * @param req - Next.js API request
 * @param res - Next.js API response
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Drop the existing table if it exists
    await sql`DROP TABLE IF EXISTS artisans;`;
    
    // Create the artisans table
    await createArtisansTable();
    
    // Populate with sample data
    await populateSampleData();
    
    res.status(200).json({ 
      success: true, 
      message: 'Artisans table dropped, recreated, and populated with sample data',
      created: true
    });
  } catch (error) {
    console.error('API route error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred while setting up the artisans table',
      error: error instanceof Error ? error.message : String(error)
    });
  }
}

/**
 * Create the artisans table
 */
async function createArtisansTable() {
  try {
    await sql`
      CREATE TABLE artisans (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        specialty VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        image_url VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    console.log('Artisans table created successfully');
  } catch (error) {
    console.error('Error creating artisans table:', error);
    throw error;
  }
}

/**
 * Populate the artisans table with sample data
 */
async function populateSampleData() {
  try {
    // Sample artisans data with actual image URLs
    const artisans = [
      {
        name: 'Emma Johnson',
        specialty: 'Jewelry Designer',
        description: 'Emma creates beautiful handcrafted jewelry using sustainable materials.',
        image_url: 'https://cdn.prod.website-files.com/67164fffef59739a81dd1c7c/671695c14b33367b1ecd1cfe_BPC_Emma.jpg'
      },
      {
        name: 'Michael Chen',
        specialty: 'Woodworker',
        description: 'Michael specializes in handcrafted wooden home decor and furniture.',
        image_url: 'https://static.wixstatic.com/media/45281b_c4363a6b9fad4d348378989dca653f90~mv2.jpg/v1/fill/w_640,h_554,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/45281b_c4363a6b9fad4d348378989dca653f90~mv2.jpg'
      },
      {
        name: 'Sophia Martinez',
        specialty: 'Textile Artist',
        description: 'Sophia creates handwoven textiles and clothing using traditional techniques.',
        image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbRro5bcSCVTyYJieprv9NZrln9IkPJBaOpQ&s'
      },
      {
        name: 'James Wilson',
        specialty: 'Ceramicist',
        description: 'James crafts unique ceramic pieces inspired by nature and organic forms.',
        image_url: 'https://i.scdn.co/image/ab6761610000e5eb34e415cf247215b354259d11'
      },
      {
        name: 'Olivia Taylor',
        specialty: 'Leather Artisan',
        description: 'Olivia handcrafts premium leather goods using traditional techniques.',
        image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlx6Xn-dmkl18vyjW8Tth_6rzI76NoN5afZA&s'
      }
    ];
    
    // Insert each artisan
    for (const artisan of artisans) {
      await sql`
        INSERT INTO artisans (name, specialty, description, image_url)
        VALUES (${artisan.name}, ${artisan.specialty}, ${artisan.description}, ${artisan.image_url});
      `;
    }
    
    console.log('Sample artisans data inserted successfully');
  } catch (error) {
    console.error('Error populating artisans table:', error);
    throw error;
  }
}
