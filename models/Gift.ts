import {
  HydratedDocument,
  model,
  models,
  Schema,
  type InferSchemaType,
  type Model,
} from "mongoose";

const GiftSchema = new Schema(
  {
    name: { type: String, trim: true, maxLength: 100, required: true },
    description: { type: String, maxLength: 500 },
    giver: {
      type: { type: Schema.Types.ObjectId, ref: "User" },
      required: true,
    },
    receiver: {
      type: { type: Schema.Types.ObjectId, ref: "User" },
      required: true,
    },
    eventId: {
      type: [{ type: Schema.Types.ObjectId, ref: "Event" }],
      required: true,
    },
    purchase_price: { type: Number, required: true },
    full_price: { type: Number },
  },
  {
    timestamps: true,
    collection: "gifts",
  },
);

export type IGift = InferSchemaType<typeof GiftSchema>;
export type IGiftDocument = HydratedDocument<IGift>;
export type IGiftModel = Model<IGift>;

const Gift =
  (models.Gift as IGiftModel | undefined) ?? model<IGift>("Gift", GiftSchema);

export default Gift;
