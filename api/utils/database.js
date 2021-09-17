import { MongoClient } from "mongodb";

const username = "lukasz";
const password = "wrQJjKV5XEoKNKFD";
const nameDatabase = "XXXL_FullStack_Shop-React-NodeJs";

const addressDB = `mongodb+srv://${username}:${password}@cluster0.eduju.mongodb.net/${nameDatabase}?retryWrites=true&w=majority`;

let _db;

export const mongoConnect = (callback) => {
  MongoClient.connect(addressDB)
    .then((client) => {
      console.log("Connected !");
      _db = client.db("shop");
      callback();
    })
    .catch((err) => {
      console.log("err");
      console.log(err);
      throw err;
    });
};

export const getDB = () => {
  if (_db) return _db;
  throw "No database found";
};

// export default mongoConnect;
