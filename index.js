require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./models/Card");
require("./models/Address");
require("./models/User");
const connectDB = require("./config/dbConfig");
const imageRoute = require("./routes/imageRoute");
const authRoute = require("./routes/authRoute");
const restaurantRoute = require("./routes/restaurantRoute");
const sharedCartRoute = require("./routes/sharedCart");
const paymentRoute = require("./routes/paymentRoute");
const addressRoute = require("./routes/addressRoute")
const feURL = process.env.FE_URL

async function startServer() {
  try {
    await connectDB(process.env.MONGO_URI);
    const app = express();

    app.use(express.json());

    app.use(
      cors({
        origin: '*',
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
      })
    )

    app.use("/api", imageRoute)
    app.use("/api/auth", authRoute)
    app.use("/api/card", paymentRoute)
    app.use("/api/address", addressRoute)
    app.use("/api/restaurant", restaurantRoute)
    app.use("/api/cart", sharedCartRoute)

    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.log("Error", error);
  }
}

startServer();
