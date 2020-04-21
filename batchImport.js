'use strict';

const { MongoClient } = require('mongodb');
const assert = require('assert');
const fs = require('file-system');

const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
});

const greetings = JSON.parse(fs.readFileSync('data/greetings.json'));

const batchImport = async (req, res) => {
    try {
        await client.connect();
        console.log('connected!');

        const db = client.db('exercises');
        console.log('req.body', req.body);

        let result = await db.collection('two').insertMany(greetings);
        assert.equal(greetings.length, result.insertedCount);
        console.log('success');
        res.status(200).json({ status: 200 });

    }
    catch (err) {

        res.status(404).json({ status: 404 });
        console.log(err.stack);
    }
    // close the connection to the database server
    client.close();
    console.log('disconnected!');

};

// batchImport();
module.exports = { batchImport };