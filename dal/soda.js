var oracledb = require('oracledb');
var dbConfig = require('../dbconfig.js');

// The general recommendation for simple SODA usage is to enable autocommit
oracledb.autoCommit = true;
oracledb.poolTimeout = 0;

var conn;
var soda = connect();
var collection;

console.log("Oracle SODA Server Connected");

async function connect() {

    let soda

    conn = await oracledb.getConnection(dbConfig);
    console.log(conn);

    // Create the parent object for SODA
    soda = conn.getSodaDatabase();

    // Create a new SODA collection and index
    // This will open an existing collection, if the name is already in use.
    collection = await soda.createCollection("messages");

    return soda;
}

module.exports.countAll = async function () {
    try {
        // Count all documents
        res = await collection.find().count();
        return 'Collection has ' + res.count + ' documents';
    } catch (err) {
        console.error(err);
    } finally {
        if (collection) {

        }
        if (conn) {
            /*   try {
                 await conn.close();
               } catch (err) {
                 console.error(err);
               }*/
        }
    }
}

module.exports.insertMessage = async function (userName, messageText) {
    try {
        let doc;

		/*const indexSpec = { "name": "Message_Text_IDX",
		  "fields": [ {
			"path": "msgText",
			"datatype": "string",
			"order": "asc" } ] };
		await collection.createIndex(indexSpec);*/

        // Insert a document.
        // A system generated key is created by default.
        let message = { username: userName, msgText: messageText };
        console.log(message);
        doc = await collection.insertOneAndGet(message);
        const key = doc.key;
        console.log("The key of the new SODA document is: ", key);


    } catch (err) {
        console.error(err);
    } finally {
        if (collection) {

        }
        if (conn) {
            /*   try {
                 await conn.close();
               } catch (err) {
                 console.error(err);
               }*/
        }
    }
}

module.exports.dropCollection = async function () {

    try {
        let soda, content, doc, documents, res;

        conn = await oracledb.getConnection(dbConfig);
        console.log(conn);

        // Create the parent object for SODA
        soda = conn.getSodaDatabase();

        // Create a new SODA collection and index
        // This will open an existing collection, if the name is already in use.
        collection = await soda.createCollection("messages");

        console.log(collection);

    } catch (err) {
        console.error(err);
    } finally {
        if (collection) {
            // Drop the collection
            let res = await collection.drop();
            if (res.dropped) {
                console.log('Collection was dropped');
            }
        }
        if (conn) {
            try {
                await conn.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}
