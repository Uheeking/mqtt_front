const { faker } = require('@faker-js/faker');
const mqtt = require('mqtt');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const MQTT_URL = process.env.MQTT_URL;
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

// Connect to the MQTT broker
const client = mqtt.connect(`mqtt://${MQTT_URL}`);

client.on('connect', () => {
    console.log('Connected to MQTT broker');

    // Publish data every 5 seconds
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
