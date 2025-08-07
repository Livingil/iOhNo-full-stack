const express = require("express");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const city = req.query.city || "Moscow";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=${process.env.WEATHER_API_KEY}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    res.send({ error: null, data });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

module.exports = router;
