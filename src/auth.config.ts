// This file is no longer needed as we're using the auth.ts file directly
// Keeping this file for reference

import type { AuthOptions } from "next-auth";

// This configuration has been moved to auth.ts
export const authConfig: AuthOptions = {
  pages: {
    signIn: "/auth/login",
  },
  providers: [], // configured in auth.ts
};
