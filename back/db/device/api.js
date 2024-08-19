const express = require("express");
const router = express.Router();
const {
  getDevice,
  getAllDevice,
  getDeviceInfo,
  getMainDeviceInfo,
  postCreateDevice,
  postSearchDevices,
  putUpdateDevice,
  deleteDevice,
  getValues,
} = require('./querydb');

const handleError = (res, error) => {
  console.error("API Error:", error); // Log the error for debugging
  res.status(500).json({ status: 'error', message: error.message });
};

router.get("/getDevice/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ status: 'error', message: 'Device ID is required' });
  }
  try {
    const result = await getDevice(id);
    res.json({ status: 'success', data: result });
  } catch (error) {
    handleError(res, error);
  }
});

router.get("/getAllDevice", async (req, res) => {
  try {
    const result = await getAllDevice();
    res.json({ status: 'success', data: result });
  } catch (error) {
    handleError(res, error);
  }
});

router.get("/getMainDeviceInfo", async (req, res) => {
  try {
    const result = await getMainDeviceInfo();
    res.json({ status: 'success', data: result });
  } catch (error) {
    handleError(res, error);
  }
});



router.get("/getDeviceInfo/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ status: 'error', message: 'Device ID is required' });
  }
  
  try {
    const result = await getDeviceInfo(id);
    res.json({ status: 'success', data: result });
  } catch (error) {
    handleError(res, error);
  }
});

router.post("/postCreateDevice", async (req, res) => {
  console.log(req.body); // Log the request body to ensure you're receiving it correctly
  
  const { deviceName, macAddress } = req.body; // Destructure using 'deviceName'
  if (!deviceName || !macAddress) {
    return res.status(400).json({ status: 'error', message: 'Device name and MAC address are required' });
  }

  try {
    const result = await postCreateDevice(req.body);
    res.json({ status: 'success', data: result });
  } catch (error) {
    handleError(res, error);
  }
});

router.post("/postSearchDevices", async (req, res) => {
  console.log(req.body);
  
  const { keyword, category } = req.body; // Destructure using 'keyword'
  if (!keyword || !category) {
    return res.status(400).json({ status: 'error', message: 'Device name and MAC address are required' });
  }
  try {
    const result = await postSearchDevices(req.body);
    res.json({ status: 'success', data: result });
  } catch (error) {
    handleError(res, error);
  }
});

router.put("/putUpdateDevice/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  console.log(id, name);
  

  if (!id || !name) {
    return res.status(400).json({ status: 'error', message: 'Device ID and name are required' });
  }

  try {
    const result = await putUpdateDevice(name, id);
    res.json({ status: 'success', data: result });
  } catch (error) {
    handleError(res, error);
  }
});

router.delete("/deleteDevice/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ status: 'error', message: 'Device ID is required' });
  }

  try {
    const result = await deleteDevice(id);
    res.json({ status: 'success', data: result });
  } catch (error) {
    handleError(res, error);
  }
});

router.get("/getValues", async (req, res) => {
  try {
    const result = await getValues();
    res.json({ status: 'success', data: result });
  } catch (error) {
    handleError(res, error);
  }
});

module.exports = router;
