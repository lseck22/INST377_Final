import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/weather", (req, res) => {
  const city = req.query.city;

  console.log("Received request for city:", city);

  res.json([
    { date: "Mon", temp: 22 },
    { date: "Tue", temp: 24 },
    { date: "Wed", temp: 21 },
    { date: "Thu", temp: 23 },
    { date: "Fri", temp: 25 },
    { date: "Sat", temp: 26 },
    { date: "Sun", temp: 24 }
  ]);
});

app.listen(3000, () => {
  console.log("✅ Backend running on http://localhost:3000");
});
