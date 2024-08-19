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

      // const sql = 'INSERT INTO test (name, macAddress) VALUES (?, ?)';
      const sql = 'INSERT INTO test (name, macAddress, co2, temperature, humidity, Illuminance, dust) VALUES (?, ?, ?, ?, ?, ?, ?)';
      // const values = [data.name, data.macAddress]; // Adjust this according to your data structure
      const values = [data.name, data.macAddress, data.co2, data.temperature, data.humidity, data.Illuminance, data.dust];
      console.log(values);

      const res = await db.query(sql, values);
      console.log('Data inserted into database:', res);
    } catch (err) {
      console.error('Error inserting data into database or parsing JSON message:', err);
    }
});