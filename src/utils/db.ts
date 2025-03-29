import { sql } from '@vercel/postgres';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

/**
 * Database utility functions for connecting to and querying Vercel Postgres
 */

/**
 * Test the database connection
 * @returns {Promise<boolean>} True if connection is successful
 */
export async function testConnection() {
  try {
    const result = await sql`SELECT NOW();`;
    console.log('Database connection successful:', result);
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

/**
 * Execute a SQL query
 * @param {string} query - SQL query string with placeholders
 * @param {any[]} params - Parameters to replace placeholders
 * @returns {Promise<any>} Query result
 */
export async function executeQuery(query: string, params: any[] = []) {
  try {
    // Using the tagged template literal from @vercel/postgres
    const result = await sql.query(query, params);
    return result;
  } catch (error) {
    console.error('Query execution failed:', error);
    throw error;
  }
}

/**
 * Get database connection configuration
 * @returns {Object} Database configuration
 */
export function getDbConfig() {
  return {
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    url: process.env.POSTGRES_URL,
  };
}

// Export the sql client for direct use
export { sql };
