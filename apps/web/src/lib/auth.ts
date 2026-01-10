import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'read:user',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, profile }) {
      if (profile) {
        // @ts-expect-error - 'login' exists on the GitHub profile
        token.username = profile.login;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.username) {
        session.user.name = token.username as string;
      }
      return session;
    },
  },
  pages: {
    newUser: '/installation',
    signIn: '/api/auth/signin',
  },
};
