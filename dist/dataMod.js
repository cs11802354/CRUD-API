"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoSchema = void 0;
const mongoose = require("mongoose");
const url = 'mongodb://127.0.0.1:27017/local';
// this function connect to the database 
// if while connecting some error occurs then it will show you error messge else it will print
// "successfully connected to MonogDB" on the console.
mongoose.connect(url, (err) => {
    if (err) {
        console.log(err.message);
    }
    else {
        console.log("successfully connected to MonogDB");
    }
});
// this is the structure of the object which is also called as Schema
// there are multiple attributes are present like device which is type of string etc.
exports.InfoSchema = new mongoose.Schema({
    device: { type: String, required: true },
    t: { type: String, required: true },
    w: { type: Number, required: true },
    h: { type: String, required: true },
    p1: { type: Number, required: true },
    p25: { type: Number, required: true },
    p10: { type: Number, required: true }
});
// I have assigned the name of my database as IS which is collection of the object,
// where the object is type device which is above described.
const IS = mongoose.model("IS", exports.InfoSchema);
exports.default = IS;
//# sourceMappingURL=dataMod.js.map