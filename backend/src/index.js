import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import organRoutes from "./routes/organs.js";
import requestRoutes from "./routes/requests.js";
import chatRoutes from "./routes/chat.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => res.send("Organ Donation API running"));
app.use("/api/auth", authRoutes);
app.use("/api/organs", organRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 4000;

connectToDatabase(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`🚀 Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error("Failed to start server:", err.message);
    process.exit(1);
  });


