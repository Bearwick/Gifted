// types/next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      status?: "pending" | "active" | "blocked";
      role?: "user" | "admin";
    };
  }

  interface User {
    status?: "pending" | "active" | "blocked";
    role?: "user" | "admin";
  }
}

export {};
