// get, post method about db
const db = require('../database');

async function getDevice() {
  try {
    const query = 'SELECT * FROM test order by id DESC limit 5';
    const result = await db.query(query);
    const packetResults = JSON.parse(JSON.stringify(result));

    console.log('All : getDevice', packetResults.length); // Print all device (optional)

    if (packetResults.length > 0) {
      return packetResults;
    } else {
      console.log('No device found.');
      return [];
    }
  } catch (error) {
    console.error('Error fetching device:', error);
    throw error;
  }
}

async function postcreateDevice(name, macAddress) {
  console.log('querydb', name, macAddress);
  try {
    const sql = 'INSERT INTO test (name, type, macAddress) VALUES (?, "sensor", ?)';
    const values = [name, macAddress];
    const result = await db.query(sql, values);

    console.log('Device created successfully:', result);
    return result; // Return the ID of the newly inserted user
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

async function putUpdateDevice(name, id) {
  try {
    const sql = 'UPDATE test SET name = ? WHERE id = ?';
    const values = [name, id];
    const result = await db.query(sql, values);

    console.log('Device created successfully:', result);
    return result; // Return the ID of the newly inserted user
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

async function deleteDevice(id) {
  try {
    const result = await db.query('DELETE FROM test WHERE id = ?', [id]);
    return result;
  } catch (error) {
    throw new Error('Error deleting user: ' + error.message);
  }
}

module.exports = {
  getDevice,
  postcreateDevice,
  putUpdateDevice,
  deleteDevice,
};