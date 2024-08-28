import { Document, model, Schema } from "mongoose";

export interface IReading extends Document {
  image: string;
  customer_code: string;
  measure_datatime: Date;
  measure_type: "WATER" | "GAS";
  readingValue: number;
  createdAt: Date;
}

const readingSchema = new Schema<IReading>({
  image: { type: String, required: true },
  customer_code: { type: String, required: true },
  measure_datatime: { type: Date, required: true },
  measure_type: { type: String, enum: ["WATER", "GAS"], required: true },
  readingValue: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Reading = model<IReading>("Reading", readingSchema);

export default Reading;
