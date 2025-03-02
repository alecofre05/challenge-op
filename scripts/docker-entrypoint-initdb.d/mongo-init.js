db = db.getSiblingDB('dbchallenge');
console.log('Using dbchallenge db');
db.createUser(
    {
        user: 'api',
        pwd: 'api1234',
        roles: [{ role: 'readWrite', db: 'dbchallenge' }],
    },
);
console.log('User created');
db.createCollection('planetreports');
console.log('Collection created');