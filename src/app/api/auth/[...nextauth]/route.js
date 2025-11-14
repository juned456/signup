// /app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

export const runtime = "nodejs"; // ← important: force Node runtime (NextAuth is not Edge-safe)

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// helper
async function findUserByEmail(email) {
  const res = await pool.query(
    "SELECT id, name, email, mobile, password_hash FROM users_next WHERE email = $1",
    [email]
  );
  return res.rows[0] || null;
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email" },
        password: { label: "Password" },
      },
      async authorize(credentials) {
        try {
          console.log("authorize() called with:", credentials);
          if (!credentials?.email || !credentials?.password) {
            console.log("authorize: missing fields");
            return null;
          }
          const user = await findUserByEmail(credentials.email.toLowerCase());
          console.log("authorize: db user:", !!user, user?.email);
          if (!user) return null;

          const valid = await bcrypt.compare(
            credentials.password,
            user.password_hash
          );
          console.log("authorize: bcrypt valid:", valid);
          if (!valid) return null;

          // success
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
          };
        } catch (err) {
          console.error("authorize error:", err);
          // if you throw, NextAuth surface becomes generic; returning null is fine
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.mobile = user.mobile; // 👈 added
        token.name = user.name; // optional
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id;
        session.user.mobile = token.mobile; // 👈 add mobile to session
        session.user.name = token.name; // optional
      }
      return session;
    },
  },
  pages: { signIn: "/auth/signin" },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
