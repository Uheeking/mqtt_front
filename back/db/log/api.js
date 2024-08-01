const express = require("express");
const router = express.Router();
const { postLogWarnings, getLogList } = require('./querydb');

router.get("/getLogList", async (req, res) => {
    try {
        const result = await getLogList();
        res.json(result);
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
}); 

router.post("/postLogWarnings", async (req, res) => {
    try {
        const result = await postLogWarnings(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

module.exports = router;