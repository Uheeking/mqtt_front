require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mqtt = require('mqtt');
const db = require('../db/database');
const MQTT_URL = process.env.MQTT_URL;

const mqttBrokerUrl = `mqtt://${MQTT_URL}`;
const topic = 'waview/easyxcool/envValues';

const mqttClient = mqtt.connect(mqttBrokerUrl);

mqttClient.on('connect', () => {
  mqttClient.subscribe(topic, (err) => {
    if (err) {
      console.error('Error subscribing to topic:', err);
    } else {
      console.log('Subscribed to topic: ', topic);
    }
  });
});

mqttClient.on('message', async (topic, message) => {
  // mosquitto_pub -h localhost -t hello -m '{"name": "new", "macAddress": "j1231231"}'
  try {
    const data = JSON.parse(message.toString());
    console.log(`Received message on ${topic}:`, data);

    const { DEV_ID, DEV_NO, MAIN_DEVICE, RUN_STAT, TEMPR_1, TEMPR_2, W_PRES, AC_CURR, WATER_PRESSURE, ALARM_STAT, V_STAT, V_STUCK, V_LEAK, SEN_IGN_STAT } = data;
  
    const checkSql = 'SELECT COUNT(*) AS count FROM test_mqtt_connect WHERE DEV_ID = ?';
    const [checkResult] = await db.query(checkSql, [DEV_ID]); // Assuming 'name' is the DEV_ID
    console.log('check', typeof (checkResult.count));
    const devIdExists = checkResult.count > 0;

    const insertStatusSql = `
              INSERT INTO test_mqtt_connect (DEV_ID, DEV_NO, MAIN_DEVICE, RUN_STAT, TEMPR_1, TEMPR_2, W_PRES, AC_CURR, WATER_PRESSURE)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
          `;
    const insertStatusValues = [DEV_ID, DEV_NO, MAIN_DEVICE, RUN_STAT, TEMPR_1, TEMPR_2, W_PRES, AC_CURR, WATER_PRESSURE];
    await db.query(insertStatusSql, insertStatusValues);

    if (devIdExists) {
      const updateInfoSql = `
              UPDATE test_mqtt_connect_device_info 
              SET ALARM_STAT = ?, V_STAT = ?, V_STUCK = ?, V_LEAK = ?, SEN_IGN_STAT = ?
              WHERE DEV_ID = ?
          `;
      const updateInfoValues = [ALARM_STAT, V_STAT, V_STUCK, V_LEAK, SEN_IGN_STAT, DEV_ID];
      await db.query(updateInfoSql, updateInfoValues);
      console.log('Data updated in database');
    } else {
      const insertInfoSql = `
              INSERT INTO test_mqtt_connect_device_info (DEV_ID, DEV_NO, MAIN_DEVICE, ALARM_STAT, V_STAT, V_STUCK, V_LEAK, SEN_IGN_STAT)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `;
      const insertInfoValues = [DEV_ID, DEV_NO, MAIN_DEVICE, ALARM_STAT, V_STAT, V_STUCK, V_LEAK, SEN_IGN_STAT];
      await db.query(insertInfoSql, insertInfoValues);
      console.log('Data inserted into database');
    }
  } catch (err) {
    console.error('Error inserting data into database or parsing JSON message:', err);
  }
});