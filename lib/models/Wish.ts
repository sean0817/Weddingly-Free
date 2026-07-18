import mongoose, { Schema, models } from "mongoose";

const wishSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    attendance: {
      type: String,
      required: true,
      enum: ["Hadir", "Tidak Hadir"],
    },
    guests: {
      type: Number,
      required: true,
      min: 1,
      max: 8,
    },
    message: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export const Wish = models.Wish || mongoose.model("Wish", wishSchema);
export default Wish;
