const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { postLogWarnings } = require('./db/device/querydb');
const { getValues } = require('./mqtt/getMqttData');
const db = require('./db/database');
require("dotenv").config();
const PORT = process.env.PORT || 3002;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: function (origin, callback) {
            const allowedOrigins = [
                "http://localhost:3000",
            ]; // Add other allowed origins if needed
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
        optionsSuccessStatus: 200,
    })
);

app.get("/", (req, res) => res.send("Express on Vercel"));
app.use("/device", require("./db/device/api"));
app.use("/log", require("./db/log/api"));

app.get('/getList', async (req, res) => {
    try {
        const query = 'SELECT * FROM test_deviceinfo';
        const result = await db.query(query);
        const packetResults = JSON.parse(JSON.stringify(result));
        console.log('All : getDevice', packetResults)
        res.json(result);
    } catch (err) {
        console.error('Error fetching data from database', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get("/getValues", async (req, res) => {
    try {
        const result = await getValues();
        res.json(result);
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

app.post("/postLogWarnings", async (req, res) => {
    try {
        const result = await postLogWarnings(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

app.listen(PORT, () => console.log("Server ready on port ", PORT));

module.exports = app;