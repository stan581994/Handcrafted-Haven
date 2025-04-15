import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Check if the role column exists in the users table
    try {
      await sql`SELECT role FROM users LIMIT 1`;
      console.log("Role column exists");
    } catch (error) {
      console.log("Role column does not exist, adding it");
      await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'user'`;
    }
    
    // Delete existing users
    await sql`DELETE FROM users`;
    
    // Create a new demo user
    const demoHashedPassword = await bcrypt.hash("password123", 10);
    
    await sql`
      INSERT INTO users (name, email, password, role)
      VALUES ('Demo User', 'demo@example.com', ${demoHashedPassword}, 'user');
    `;
    
    // Create a new admin user
    const adminHashedPassword = await bcrypt.hash("password123", 10);
    
    await sql`
      INSERT INTO users (name, email, password, role)
      VALUES ('Admin User', 'admin@example.com', ${adminHashedPassword}, 'admin');
    `;
    
    return res.status(200).json({
      message: "Users reset successfully",
      users: [
        {
          email: "demo@example.com",
          password: "password123", // Only showing this for demo purposes
          role: "user"
        },
        {
          email: "admin@example.com",
          password: "password123", // Only showing this for demo purposes
          role: "admin"
        }
      ]
    });
  } catch (error) {
    console.error("Error resetting user:", error);
    return res.status(500).json({ error: "Failed to reset user" });
  }
}
