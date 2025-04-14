import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "../../../auth";

// Export the handler to handle all NextAuth.js requests
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Forward the request to the auth handler
  return await auth(req, res);
}
