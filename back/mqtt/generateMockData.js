//publish.js
const { faker } = require('@faker-js/faker');
const mqtt = require('mqtt');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const MQTT_URL = process.env.MQTT_URL;
const deviceMac = '1A2B3C4D5E6F'
// const topic = `waview/easyxcool/${deviceMac}/envValues`;
const topic = `waview/easyxcool/envValues`;
// Function to generate random data within a range
function getRandomData(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
}

// Function to generate mock data
function generateMockData() {
    return {
        name: faker.name.firstName(),
        macAddress: faker.internet.mac(),
        dust: getRandomData(0, 500), // µg/m³
        co2: getRandomData(300, 5000), // ppm
        temperature: getRandomData(-10, 40), // °C
        humidity: getRandomData(0, 100), // %
        Illuminance: getRandomData(0, 100000) // lx
    };
}

function DeviceInfoTest() {
    return {
        "DEV_ID": "nnnnnn", 
        "OFF_T": ["123", "123", "123"], 
        "ON_T": ["456", "456", "456"],
        "CURR_THR": "123",
        "TEMPR_THR": "80",
        "TEMPR_OVR": "90",
        "TEMPR_MIN": "24",
        "ALARM_LVL": "2",
        "SEN_IGN": "1",
        "PERIOD": "10"
    };
}

// Connect to the MQTT broker
const client = mqtt.connect(`mqtt://${MQTT_URL}`);

client.on('connect', () => {
    console.log('Connected to MQTT broker');
    setInterval(() => {
    const record = DeviceInfoTest();
    const message = JSON.stringify(record);
    client.publish(topic, message, (err) => {
        if (err) {
            console.error('Error publishing message:', err);
        } else {
            console.log('Message published:', message);
        }
    });
}, 10000);

    // Publish data every 5 seconds
    // setInterval(() => {
    //     const record = generateMockData();
    //     const message = JSON.stringify(record);
    //     client.publish(topic, message, (err) => {
    //         if (err) {
    //             console.error('Error publishing message:', err);
    //         } else {
    //             console.log('Message published:', message);
    //         }
    //     });
    // }, 5000); // Change this to 10000 for 10 seconds
});
