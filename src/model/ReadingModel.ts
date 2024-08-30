import { Document, model, Schema } from "mongoose";
import { v4 } from "uuid";

export interface IReading extends Document {
  image: string;
  measure_uuid: string;
  customer_code: string;
  measure_datetime: Date;
  measure_type: "WATER" | "GAS";
  has_confirmed: boolean;
  confirmed_value: number;
  //   readingValue: number;
}

const readingSchema = new Schema<IReading>({
  image: { type: String, required: true },
  measure_uuid: { type: String, default: v4(), unique: true },
  customer_code: { type: String, required: true },
  measure_datetime: { type: Date, required: true },
  measure_type: { type: String, enum: ["WATER", "GAS"], required: true },
  //   readingValue: { type: Number, required: true },
  has_confirmed: { type: Boolean, default: false },
  confirmed_value: { type: Number, default: null },
});

const Reading = model<IReading>("Reading", readingSchema);

export default Reading;
