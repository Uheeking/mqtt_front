//subscribe.js
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
    // console.log('sess', typeof(data.OFF_T));


    const offTString = JSON.stringify(data.OFF_T);
    const onTString = JSON.stringify(data.ON_T);
    // console.log(type(onTString));
    
    // const sql = 'INSERT INTO test (name, macAddress, co2, temperature, humidity, Illuminance, dust) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const sql = 'INSERT INTO test_deviceinfo (DEV_ID, OFF_T, ON_T, CURR_THR, TEMPR_THR, TEMPR_OVR, TEMPR_MIN, ALARM_LVL, SEN_IGN, PERIOD) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [
      data.DEV_ID,
      offTString,
      onTString,
      data.CURR_THR,
      data.TEMPR_THR,
      data.TEMPR_OVR,
      data.TEMPR_MIN,
      data.ALARM_LVL,
      data.SEN_IGN,
      data.PERIOD
    ];
    

    const res = await db.query(sql, values);
    console.log('Data inserted into database:', res);
    // console.log('Data received:', data);
  } catch (err) {
    console.error('Error inserting data into database or parsing JSON message:', err);
  }
});