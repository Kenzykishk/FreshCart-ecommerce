
import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface User {
    id: string
    email: string
    name: string
    accessToken: string  
  }

  interface Session {
    user: {
      id: string
      email: string
      name: string
    }
    accessToken: string  
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string
    user: {
      id: string
      email: string
      name: string
    }
  }
}