import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import facilRoute from "./routes/facilities.route.js";
import authRoute from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";

const app = express();
console.log("Hello World!");

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use("/api/facilities", facilRoute);
app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);
app.use("/api/users", userRoute);

app.listen(6969, () => {
  console.log("Server is running on port 6969. kekw -_-");
});
