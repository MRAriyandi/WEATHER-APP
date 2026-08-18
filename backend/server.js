const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

dotenv.config({
    path: path.join(__dirname, ".env")
});

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3000;

app.get("/api/weather", async (req, res) => {
    try {
        const city = req.query.city;

        if (!city) {
            return res.status(400).json({
                message: "Nama kota diperlukan"
            });
        }

        const apiUrl =
            `https://api.openweathermap.org/data/2.5/weather` +
            `?units=metric&q=${encodeURIComponent(city)}` +
            `&appid=${process.env.OPENWEATHER_API_KEY}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        res.json(data);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Terjadi kesalahan pada server"
        });
    }
});

// Cukup SATU app.listen()
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Backend berjalan di port ${PORT}`);
});