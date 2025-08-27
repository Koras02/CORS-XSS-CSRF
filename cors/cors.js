const express = require("express");
const cors = require("cors");
const app = express();

// 방어 적용
const allowedOrigin = "http://127.0.0.1:5500";
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

app.get("/api/data", (req, res) => res.json({ message: "CORS Test " }));
app.listen(4000, () => console.log("Server is running port 4000"));
