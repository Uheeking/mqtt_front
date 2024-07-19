// Example usage in another file

const db = require('./database'); // Adjust the path as needed

async function getUsers() {
  try {
    const query = 'SELECT * FROM test';
    const result = await db.query(query);
    const packetResults = JSON.parse(JSON.stringify(result));

    console.log('All Users:', packetResults.length); // Print all users (optional)

    if (packetResults.length > 0) {
      const lastUser = packetResults[packetResults.length - 1];
      // console.log('Last User:', lastUser);
      return lastUser;
    } else {
      console.log('No users found.');
      return [];
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

async function createUser(text) {
  try {
    const sql = 'INSERT INTO test (text) VALUES (?)';
    const values = [text];
    const result = await db.query(sql, values);

    console.log('User created successfully:', result);
    return result.insertId; // Return the ID of the newly inserted user
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}


module.exports = {
  createUser,
  getUsers
};