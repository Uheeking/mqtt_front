const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { getDevice, postcreateDevice, deleteDevice } = require('./db/querydb');
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

app.get("/getDevice", async (req, res) => {
    try {
        const result = await getDevice();
        res.json(result);
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

app.post("/postcreateDevice", async (req, res) => {
    try {
        //req.body
        //const name = 'reo';
        console.log(req.body);
        const result = await postcreateDevice();
        res.json(result);
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

app.delete("/deleteDevice/:id", async (req, res) => {
    try {
        console.log(req.params.id);
        const id = req.params.id;
        const result = await deleteDevice(id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

app.listen(3002, () => console.log("Server ready on port ", PORT));

module.exports = app;