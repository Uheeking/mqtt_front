const express = require("express");
const router = express.Router();
const { getDevice, postCreateDevice, putUpdateDevice, deleteDevice } = require('./querydb');

router.get("/getDevice", async (req, res) => {
    try {
        const result = await getDevice();
        res.json(result);
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

router.post("/postCreateDevice", async (req, res) => {
    try {
        const name = req.body.name;
        const macAddress = req.body.macAddress;
        const result = await postCreateDevice(name, macAddress);
        res.json(result);
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

router.put("/putUpdateDevice/:id", async (req, res) => {
    try {
        const name = req.body.name;
        const id = req.params.id;
        const result = await putUpdateDevice(name, id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

router.delete("/deleteDevice/:id", async (req, res) => {
    try {
        console.log(req.params.id);
        const id = req.params.id;
        const result = await deleteDevice(id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

router.get("/getValues", async (req, res) => {
    try {
        const result = await getValues();
        res.json(result);
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

module.exports = router;