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
    collection = await soda.createCollection("letsLunch");

    return soda;
}

module.exports.countAll = async function () {
    try {
        // Count all documents
        var res = await collection.find().count();
        return 'Collection has ' + res.count + ' documents';
    } catch (err) {
        console.error(err);
    }
}

module.exports.findAll = async function (docType) {
    try {
        var count = await collection.find().filter({"docType": docType}).count();
        var res = await collection.find().filter({"docType": docType}).getDocuments();
        for(i=0; i<res.length; i++){
            res[i] = convertSodaDocumentToNormalJson(res[i], docType);
        }
        return {count: count.count, results: res};
    } catch (err) {
        console.error(err);
    }
}

module.exports.findById = async function (id, docType) {
    try {
        var res = await collection.find().key(id).getOne();
        if(res){
            res = convertSodaDocumentToNormalJson(res, docType);
        }
        return res;
    } catch (err) {
        console.error(err);
    }
}

module.exports.insertDocument = async function (doc, docType) {
    try {
        doc.docType = docType;
        res = await collection.insertOneAndGet(doc);
        res = convertSodaDocumentToNormalJson(res, docType);
        return res;
    } catch (err) {
        console.error(err);
    }
}

module.exports.updateDocument = async function (id, doc, docType) {
    try {
        var res = await collection.find().key(id).getOne();
        if(res){
            res = convertSodaDocumentToNormalJson(res, docType);
            if(res){
                doc.docType = docType;
                res = await collection.find().key(id).replaceOne(doc);
                if(res && res.replaced){
                    res = {_id: id};
                }
            }
        }
        return res;
    } catch (err) {
        console.error(err);
    }
}

module.exports.deleteById = async function (id, docType) {
    try {
        var res = await collection.find().key(id).remove();
        if(res.count > 0){
            res = {_id: id};
        } else {
            res = null;
        }
        return res;
    } catch (err) {
        console.error(err);
    }
}

function convertSodaDocumentToNormalJson(sodaDocument, docType){
    var result = sodaDocument.getContent();
    if(result){
        if(result.docType != docType){
            return null;
        }
        result._id = sodaDocument.key;
    } else {
        return {_id: sodaDocument.key};
    }
    delete result.docType;
    return result;
}