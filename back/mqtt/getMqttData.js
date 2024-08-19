const db = require('../db/database');

async function getValues() {
    try {
        const query = 'SELECT * FROM test_mqtt_connect order by DEV_ID DESC limit 5';
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

module.exports = {
    getValues
}