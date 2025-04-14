import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Create users table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Check if we already have users
    const result = await sql`SELECT COUNT(*) FROM users`;
    const count = parseInt(result.rows[0].count);

    if (count === 0) {
      // Create a demo user
      const hashedPassword = await bcrypt.hash("password123", 10);
      
      await sql`
        INSERT INTO users (name, email, password)
        VALUES ('Demo User', 'demo@example.com', ${hashedPassword});
      `;
      
      return res.status(200).json({
        message: "Users table created and demo user added successfully",
        demoUser: {
          email: "demo@example.com",
          password: "password123" // Only showing this for demo purposes
        }
      });
    }

    return res.status(200).json({
      message: "Users table already exists with data",
      userCount: count
    });
  } catch (error) {
    console.error("Error setting up users table:", error);
    return res.status(500).json({ error: "Failed to set up users table" });
  }
}
