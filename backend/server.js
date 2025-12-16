import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import errorHandler from "./middleware/errorHandler.js";
import OpenAI from "openai";

import userRoutes from "./routes/users.js";
import menuRoutes from "./routes/menu.js";
import orderRoutes from "./routes/orders.js";
import reservationRoutes from "./routes/reservations.js";
import eventRoutes from "./routes/events.js";
import authRoutes from "./routes/auth.js";

const app = express();
dotenv.config();
app.use(cors());

connectDB();

app.use(helmet());
app.use(morgan('dev'));
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/auth", authRoutes);

app.use(errorHandler);

app.get('/', (req, res) => res.send('SRMS Backend API Running!'));

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/chat", async (req, res) => {
    const { message } = req.body;

    try {
        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content:
                        "You are a friendly restaurant assistant. Recommend dishes, answer dietary questions, and mention specials.",
                },
                { role: "user", content: message },
            ],
        });

        res.json({
            reply: completion.choices[0].message.content,
        });
    } catch (err) {

        if (err.code === "insufficient_quota" || err.status === 429) {
            return res.json({
                reply: `If you are seeing this, the code works, I just ran out of tokens to generate responses, sorry!`
            });
        }

        console.error(err);
        res.status(500).json({ error: "AI failed to respond" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));