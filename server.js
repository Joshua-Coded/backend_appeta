import "dotenv/config.js";
import cartRouter from "./routes/cartRoutes.js";
import cors from "cors";
import express from "express";
import foodRouter from "./routes/foodRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { connectDB } from "./config/db.js";

// App config

const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static("uploads"))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get('/', (req, res) => {
    res.send("API WORKING")
})

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})
