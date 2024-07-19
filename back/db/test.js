// db connection test and print db query
const { createUser, getUsers } = require('./querydb'); // Adjust the path as needed

async function runExample() {
  try {
    const text = 'reo';

    const textQuery = await createUser(text);

    console.log('New text query:', textQuery);
  } catch (error) {
    console.error('Error in example:', error);
  } finally {
    const getUser = await getUsers();
    console.log('print get users',getUser);
  }
}

// Call the example function
module.exports = {
  runExample,
}
