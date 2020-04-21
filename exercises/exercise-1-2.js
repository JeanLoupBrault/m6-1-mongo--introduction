const { MongoClient } = require('mongodb');


const getCollection = async (req, res) => {

    const { dbName, collection } = req.params;
    const client = new MongoClient('mongodb://localhost:27017', {
        useUnifiedTopology: true,
    });
    // open the connection to the database server
    await client.connect();
    console.log('connected!');

    const db = client.db(dbName);

    let result = await db.collection(collection).find().toArray();
    console.log('result', result);
    if (result) res.status(200).json({ status: 200, connection: 'successful!' });
    else res.status(400).json({ status: 400, connection: 'error' });

    // close the connection to the database server
    client.close();
    console.log('disconnected!');
    res.status(200).json({ status: 200, connection: 'successful!' });
};

module.exports = { getCollection };