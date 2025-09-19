const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Store multiple users' locations
let locations = {}; // { "user1": {lat, lon}, "user2": {lat, lon} }

// ✅ Endpoint to receive location from phone
app.post("/location", (req, res) => {
  const { id, lat, lon } = req.body;

  if (!id || lat === undefined || lon === undefined) {
    console.log("Invalid location received:", req.body);
    return res.sendStatus(400);
  }

  locations[id] = { lat, lon }; // Save by user ID
  console.log(`📍 New location from ${id}:`, locations[id]);
  res.sendStatus(200);
});

// ✅ Endpoint to get all locations
app.get("/locations", (req, res) => {
  res.json(locations);
});

// Serve frontend
app.use(express.static("public"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
