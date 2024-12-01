const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbConfig");
const imageRoute = require("./routes/imageRoute");
const authRoute = require("./routes/authRoute");
const restaurantRoute = require("./routes/restaurantRoute");
const sharedCartRoute = require("./routes/sharedCart");
const feURL = "http://localhost:5173"

async function startServer() {
  try {
    await connectDB(
        "mongodb+srv://jahnavig310:uPQwV1SErAPcR57E@cluster0.f17zh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    const app = express();

    app.use(express.json());

    app.use(
      cors({
        origin: feURL,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        credentials: true,
      })
    )

    app.use("/api", imageRoute)
    app.use("/api/auth", authRoute)
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
