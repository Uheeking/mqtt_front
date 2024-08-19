//publish.js
const { faker } = require('@faker-js/faker');
const mqtt = require('mqtt');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const MQTT_URL = process.env.MQTT_URL;
// Function to generate random data within a range
function getRandomData(min, max) {
    return Math.floor(Math.random() * (max - min) + min).toString();
}

// Function to generate mock data
function generateMockData() {
    // Generate a random RUN_STAT bitmask with only one flag set
    const runStatFlags = [0x01, 0x02, 0x04, 0x08, 0x10, 0x20];
    const randomFlag = runStatFlags[Math.floor(Math.random() * runStatFlags.length)];
    const RUN_STAT = randomFlag;

    return {
        DEV_ID: '0000000',  // Use a static DEV_ID for simplicity
        DEV_NO: 1,
        MAIN_DEVICE: '0000000',
        RUN_STAT: RUN_STAT.toString(16).padStart(2, '0').toUpperCase(),  // Convert to hex string, padded to 2 digits, uppercase
        TEMPR_1: getRandomData(200, 400),  // Example temperature value
        TEMPR_2: getRandomData(200, 400),  // Example temperature value
        W_PRES: getRandomData(50, 150),  // Example pressure value
        AC_CURR: getRandomData(10, 60),  // Example current value
        WATER_PRESSURE: getRandomData(0, 10),  // Example current value
        ALARM_STAT: '0',
        V_STAT: '0',
        V_STUCK: '0',
        V_LEAK: '0',
        SEN_IGN_STAT: '0'
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
        const record = generateMockData();
        const message = JSON.stringify(record);
        client.publish('hello', message, (err) => {
            if (err) {
                console.error('Error publishing message:', err);
            } else {
                console.log('Message published:', message);
            }
        });
    }, 5000); // Change this to 10000 for 10 seconds
});
