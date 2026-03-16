import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { ObjectId } from "mongodb";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import clientPromise from "./lib/mongodb";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" },
  events: {
    async createUser({ user }) {
      const client = await clientPromise;
      await client
        .db()
        .collection("users")
        .updateOne(
          { _id: new ObjectId(user.id) },
          {
            $set: {
              status: "pending",
              role: "user",
              friendIds: [],
              giftsReceived: [],
              giftsGivenAway: [],
            },
          },
        );
    },
  },
});
