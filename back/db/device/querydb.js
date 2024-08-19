
const db = require('../database');

async function getDevice(id) {
  try {
    const query = 'SELECT * FROM test_mqtt_connect where DEV_NO=? order by DEV_ID DESC limit 5';
    const result = await db.query(query, [id]);
    const packetResults = JSON.parse(JSON.stringify(result));

    console.log('All : getDevice', packetResults.length); 

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

async function getAllDevice() {
  try {
    const query = 'SELECT * FROM test_mqtt_connect_device_info';
    const result = await db.query(query);
    const packetResults = JSON.parse(JSON.stringify(result));

    console.log('All : getDevice', packetResults.length); 

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

async function getMainDeviceInfo() {
  try {
    const query = 'SELECT * FROM test_mqtt_connect_main_deviceinfo';
    const result = await db.query(query);
    const packetResults = JSON.parse(JSON.stringify(result));

    console.log('All : getDevice', packetResults.length); 

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

async function getDeviceInfo(id) {
  try {
    const sql = 'SELECT * FROM test_mqtt_connect_device_info where ID = ?';
    const values = [id];
    const result = await db.query(sql, values);
    const packetResults = JSON.parse(JSON.stringify(result));

    console.log('All : getDeviceInfo', packetResults.length); 

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

async function postSearchDevices(data) {
  console.log(data);
  
  // try {
    // if(category === )
  //   const sql = 'SELECT * FROM test_mqtt_connect_main_deviceinfo where DEV_ = ? ';
  //   const values = [category, keyword];
  //   const result = await db.query(sql, values);
  //   const packetResults = JSON.parse(JSON.stringify(result));

  //   console.log('All : getDeviceInfo', packetResults.length); 

  //   if (packetResults.length > 0) {
  //     return packetResults;
  //   } else {
  //     console.log('No device found.');
  //     return [];
  //   }
  // } catch (error) {
  //   console.error('Error fetching device:', error);
  //   throw error;
  // }
}

async function postCreateDevice(data) {
  console.log('querydb', data);
  try {
    const sql1 = 'INSERT INTO test_mqtt_connect_main_deviceinfo (DEV_NAME, DEV_NO, DEV_ID, OFF_T, ON_T, CURR_THR, TEMPR_THR, TEMPR_OVR, TEMPR_MIN, ALARM_LVL, SEN_IGN, PERIOD, PRESS_HIGH, PRESS_LOW) VALUES (?, 0, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const { deviceName, macAddress, valveOffTime, valveOnTime, valveCurrent, valveTemperature, emergencyTemperature, minOperatingTemperature, alarmLevel, sensorIgnoreSetting, transmissionInterval, highPressureLimit, lowPressureLimit } = data;
    const values1 = [deviceName, macAddress, valveOffTime, valveOnTime, valveCurrent, valveTemperature, emergencyTemperature, minOperatingTemperature, alarmLevel, sensorIgnoreSetting, transmissionInterval, highPressureLimit, lowPressureLimit];
    const result1 = await db.query(sql1, values1); 
  
    const sql2 = 'INSERT INTO test_mqtt_connect_device_info (DEV_NO, DEV_ID) VALUES (0, ?)';
    await db.query(sql2, deviceName); 
  
    console.log('Device created successfully:', result1); 
    return result1; 
  } catch (error) {
    console.error('Error creating device:', error); 
    throw error; 
  }
  
}

async function test(name, macAddress) {
  console.log('querydb', name, macAddress);
  try {
    const sql = 'INSERT INTO test_mqtt_connect_device_info (DEV_ID) VALUES (?)';
    const values = [name, macAddress];
    const result = await db.query(sql, values);

    console.log('Device created successfully:', result);
    return result; 
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

async function putUpdateDevice(name, id) {
  try {
    const sql1 = 'UPDATE test_mqtt_connect_device_info SET DEV_NAME = ? WHERE ID = ?';
    const values1 = [name, id];
    const result1 = await db.query(sql1, values1);
    console.log('Device created successfully:', result1);

    const sql2 = 'UPDATE test_mqtt_connect_main_deviceinfo SET DEV_NAME = ? WHERE ID = ?';
    const values2 = [name, id];
    const result2 = await db.query(sql2, values2);
    console.log('Device created successfully:', result2);
    
    return result1, result2; 
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

async function deleteDevice(id) {
  try {
    const result = await db.query('DELETE FROM test_mqtt_connect WHERE id = ?', [id]);
    return result;
  } catch (error) {
    throw new Error('Error deleting user: ' + error.message);
  }
}

module.exports = {
  getDevice,
  getAllDevice,
  getMainDeviceInfo,
  getDeviceInfo,
  postSearchDevices,
  postCreateDevice,
  test,
  putUpdateDevice,
  deleteDevice,
};