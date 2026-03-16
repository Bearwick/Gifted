import {
  HydratedDocument,
  model,
  models,
  Schema,
  type InferSchemaType,
  type Model,
} from "mongoose";

const EventSchema = new Schema(
  {
    ownerUserId: {
      type: { type: Schema.Types.ObjectId, ref: "User" },
      required: true,
      index: true,
    },
    eventType: { type: String, required: true, index: true },
    date: { type: Date, required: true, index: true },
    recurring: {
      type: String,
      enum: ["none", "yearly", "monthly", "weekly"],
      default: "yearly",
      required: true,
    },
    recurringEndDate: { type: Date },
    isActive: { type: Boolean, default: true, index: true },
  },
  {
    timestamps: true,
    collection: "events",
  },
);

export type IEvent = InferSchemaType<typeof EventSchema>;
export type IEventDocument = HydratedDocument<IEvent>;
export type IEventModel = Model<IEvent>;

const Event =
  (models.Event as IEventModel | undefined) ??
  model<IEvent>("Event", EventSchema);

export default Event;
