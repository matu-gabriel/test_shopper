import { Document, model, Schema } from "mongoose";

export interface IReading extends Document {
  image: string;
  customer_code: string;
  measure_datetime: Date;
  measure_type: "WATER" | "GAS";
  //   readingValue: number;
}

const readingSchema = new Schema<IReading>({
  image: { type: String, required: true },
  customer_code: { type: String, required: true },
  measure_datetime: { type: Date, required: true },
  measure_type: { type: String, enum: ["WATER", "GAS"], required: true },
  //   readingValue: { type: Number, required: true },
});

const Reading = model<IReading>("Reading", readingSchema);

export default Reading;
