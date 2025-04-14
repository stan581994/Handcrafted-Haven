import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Delete existing users
    await sql`DELETE FROM users`;
    
    // Create a new demo user
    const hashedPassword = await bcrypt.hash("password123", 10);
    
    await sql`
      INSERT INTO users (name, email, password)
      VALUES ('Demo User', 'demo@example.com', ${hashedPassword});
    `;
    
    return res.status(200).json({
      message: "User reset successfully",
      demoUser: {
        email: "demo@example.com",
        password: "password123" // Only showing this for demo purposes
      }
    });
  } catch (error) {
    console.error("Error resetting user:", error);
    return res.status(500).json({ error: "Failed to reset user" });
  }
}
