// CRUD create read update delete

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://localhost:27017';
const databaseName = 'task-manager';

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log('Unable to connect to database');
    }

    const db = client.db(databaseName);

    db.collection('tasks').insertMany(
      [
        {
          description: 'Buy groceries',
          completed: true
        },
        {
          description: 'Clean the floor',
          completed: false
        },
        {
          description: 'Prepare dinner',
          completed: false
        }
      ],
      (error, result) => {
        if (error) {
          return console.log('Unable to insert documents.');
        }

        console.log(result.ops);
      }
    );
  }
);
