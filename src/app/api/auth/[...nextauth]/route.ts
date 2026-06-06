import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Universal users for the demo
        const authorizedUsers = ['pranu21m@foi.ai', 'praul@foi.ai'];
        if (credentials?.email && authorizedUsers.includes(credentials.email)) {
          return { id: '1', name: credentials.email.split('@')[0], email: credentials.email };
        }
        
        // In a real database (Neon), we would verify Prisma db.user.findUnique here
        if (credentials?.email && credentials?.password) {
          return { id: '2', name: 'Demo User', email: credentials.email };
        }
        return null;
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.sub;
        (session.user as any).role = 'Universal User (Pro)';
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-development-only',
});

export { handler as GET, handler as POST };
