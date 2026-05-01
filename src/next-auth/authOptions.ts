import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { jwtDecode } from "jwt-decode";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Exclusive",
      credentials: {
        email: { label: "user Email", placeholder: "example@domain.com", type: "email" },
        password: { label: "user password", placeholder: "***", type: "password" }
      },
      async authorize(credentials) {
        try {
          const resp = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password
            }),
            headers: {
              "Content-Type": "application/json"
            },
          });

          const data = await resp.json();

          if (!resp.ok) {
            throw new Error(data.message || "something went wrong");
          }

          const decoded = jwtDecode<{ id: string }>(data.token);
          return {
            id: decoded.id,
            email: data.user.email,
            name: data.user.name,
            accessToken: data.token
          };
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    }),
  ],

  pages: {
    signIn: "/login"
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).accessToken ?? "";
        token.id = user.id;
        token.user = {
          id: user.id,
          email: user.email!,
          name: user.name!,
        };
      }
      return token;
    },

    session({ token, session }) {
      session.user = token.user;
      (session.user as any).accessToken = token.accessToken;
      return session;
    },
  },
};