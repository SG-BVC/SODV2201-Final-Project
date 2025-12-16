import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, enum: ['starters', 'mains', 'desserts', 'beverages'], required: true },
    description: { type: String, required: true },
    ingredients: [{ type: String }],
    price: { type: Number, required: true, min: 0 },
    available: { type: Boolean, default: true },
    dietary: [{ type: String }]
}, { timestamps: true });

export default mongoose.model("MenuItem", menuItemSchema);