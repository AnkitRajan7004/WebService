const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Store locations of multiple users by ID
let locations = {};

// Endpoint to receive location from phone
app.post("/location", (req, res) => {
  const { id, lat, lon } = req.body;

  if (id && lat !== undefined && lon !== undefined) {
    locations[id] = { lat, lon, time: new Date() }; // save by user ID
    console.log(`✅ Location received from ${id}:`, lat, lon);
    res.sendStatus(200);
  } else {
    console.log("❌ Invalid location received:", req.body);
    res.sendStatus(400);
  }
});

// Endpoint to get all locations
app.get("/locations", (req, res) => {
  res.json(locations);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
