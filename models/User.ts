import {
  model,
  models,
  Schema,
  type HydratedDocument,
  type InferSchemaType,
  type Model,
} from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, trim: true, maxlength: 100 },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      index: true,
    },
    image: { type: String, trim: true },
    emailVerified: { type: Date },
    status: {
      type: String,
      enum: ["pending", "active", "blocked"],
      default: "pending",
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },
    events: {
      type: [{ type: Schema.Types.ObjectId, ref: "Event" }],
      default: [],
    },
    friendIds: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    giftsReceived: {
      type: [{ type: Schema.Types.ObjectId, ref: "Gift" }],
      default: [],
    },
    giftsGivenAway: {
      type: [{ type: Schema.Types.ObjectId, ref: "Gift" }],
      default: [],
    },
  },
  {
    timestamps: true,
    collection: "users",
  },
);

export type IUser = InferSchemaType<typeof UserSchema>;
export type IUserDocument = HydratedDocument<IUser>;
export type IUserModel = Model<IUser>;

const User =
  (models.User as IUserModel | undefined) ?? model<IUser>("User", UserSchema);

export default User;
