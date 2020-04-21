const { MongoClient } = require('mongodb');
const assert = require('assert');

const createGreeting = async (req, res) => {
    try {

        const client = new MongoClient('mongodb://localhost:27017', {
            useUnifiedTopology: true,
        });
        // open the connection to the database server
        await client.connect();
        console.log('connected!');

        const db = client.db('exercise_two');
        console.log('req.body', req.body);

        let result = await db.collection('greeting').insertOne(req.body);
        assert.equal(1, result.insertedCount);
        res.status(201).json({ status: 201, data: req.body });

    }
    catch (err) {
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    }
    // close the connection to the database server
    // client.close();
    console.log('disconnected!');

};

const getGreeting = async (req, res) => {
    // res.status(200).json('bacon');
    const { _id } = req.params;

    const client = new MongoClient('mongodb://localhost:27017', {
        useUnifiedTopology: true,
    });

    await client.connect();
    const db = client.db('exercise_two');

    db.collection('greetings').findOne({ _id: _id.toUpperCase() }, (err, result) => {
        result
            ? res.status(200).json({ status: 200, _id, data: result })
            : res.status(404).json({ status: 404, _id, data: 'Not Found' });
        client.close();
    });
};

const getGreetings = async (req, res) => {
    // create a new client
    const client = new MongoClient('mongodb://localhost:27017', {
        useUnifiedTopology: true,
    });

    await client.connect();
    const db = client.db('exercise_two');

    db.collection('greetings')
        .find()
        .toArray((err, result) => {
            if (result.length) {
                const start = Number(req.query.start) || 0;
                const cleanStart = start > -1 && start < result.length ? start : 0;
                const end = cleanStart + (Number(req.query.limit) || 25);
                const cleanEnd = end > result.length ? result.length - 1 : end;
                const data = result.slice(cleanStart, cleanEnd);
                res.status(200).json({ status: 200, data });
            } else {
                res.status(404).json({ status: 404, data: 'Not Found' });
            }
            client.close();
        });
};


module.exports = {
    createGreeting,
    getGreeting,
    getGreetings,

};