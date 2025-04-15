import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { sql } from "@vercel/postgres";
  
// Mock user database - in a real app, you would use your database
async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
}

export default NextAuth({
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-here",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        console.log("Attempting to authenticate user:", credentials.email);
        const user = await getUser(credentials.email);
        
        if (!user) {
          console.log("User not found:", credentials.email);
          return null;
        }

        console.log("User found, comparing passwords");
        console.log("Input password:", credentials.password);
        console.log("Stored hashed password:", user.password);
        
        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        console.log("Passwords match:", passwordsMatch);

        if (!passwordsMatch) {
          console.log("Password does not match");
          return null;
        }

        // Cast to any to include the role property
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        } as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Cast to any to include custom properties
        (token as any).id = user.id;
        (token as any).role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        // Cast to any to include custom properties
        (session.user as any).id = (token as any).id;
        (session.user as any).role = (token as any).role;
      }
      return session;
    },
  },
});
