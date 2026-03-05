import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

const authConfig = {
  providers: [GitHub, Google],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.status = user.status ?? "pending";
        token.role = user.role ?? "user";
      }
      return token;
    },
    async session({ session, user, token }) {
      if (session.user) {
        session.user.id = user?.id ?? token.sub ?? "";
        session.user.email = user?.email ?? session.user.email;
        session.user.name = user?.name ?? session.user.name;
        session.user.image = user?.image ?? session.user.image;
        session.user.status =
          user?.status ??
          (token.status as "pending" | "active" | "blocked") ??
          "pending";
        session.user.role =
          user?.role ?? (token.role as "user" | "admin") ?? "user";
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export default authConfig;
