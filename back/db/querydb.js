// get, post method about db
const db = require('./database'); 

async function getDevice() {
  try {
    const query = 'SELECT * FROM test';
    const result = await db.query(query);
    const packetResults = JSON.parse(JSON.stringify(result));

    console.log('All : getDevice', packetResults.length); // Print all device (optional)

    if (packetResults.length > 0) {
      const lastDevice = packetResults[packetResults.length - 1];
      // console.log('Last Device:', lastDevice);
      return lastDevice;
    } else {
      console.log('No device found.');
      return [];
    }
  } catch (error) {
    console.error('Error fetching device:', error);
    throw error;
  }
}

async function postcreateDevice(text) {
  try {
    const sql = 'INSERT INTO test (name, type, macAddress) VALUES (?, "sensor", ?)';
    const values = [text];
    const result = await db.query(sql, values);

    console.log('Device created successfully:', result);
    return result.insertId; // Return the ID of the newly inserted user
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

async function deleteDevice(id) {
  try {
    const result = await db.query('DELETE FROM device WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Error deleting user: ' + error.message);
  }
}


module.exports = {
  getDevice,
  postcreateDevice,
  deleteDevice,
};