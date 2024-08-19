// get, post method about db
const db = require('../database');

async function getLogList() {
    try {
        const query = 'SELECT * FROM test_mqtt_connect_log order by id DESC limit 20';
        const result = await db.query(query);
        const packetResults = JSON.parse(JSON.stringify(result));

        console.log('All : getLog', packetResults.length); // Print all device (optional)

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

async function postLogWarnings(data) {
    console.log(data);
    try {
        const promises = data.map(({ logName, log }) => {
            const sql = 'INSERT INTO test_mqtt_connect_log (logName, log) VALUES (?, ?)';
            const values = [logName, log];
            return new Promise((resolve, reject) => {
                db.query(sql, values, (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                });
            });
        });

        const results = await Promise.all(promises);
        console.log('Logs created successfully:', results);
        res.status(200).send('Logs created successfully');
    } catch (error) {
        console.error('Error creating logs:', error);
        res.status(500).send('Error creating logs');
    }
}


module.exports = {
    getLogList,
    postLogWarnings
};