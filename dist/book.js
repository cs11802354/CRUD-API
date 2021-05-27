"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoSchema = void 0;
const mongoose = require("mongoose");
const url = 'mongodb://127.0.0.1:27017/local';
mongoose.connect(url, (err) => {
    if (err) {
        console.log(err.message);
    }
    else {
        console.log("successfully connected to MonogDB");
    }
});
exports.InfoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    device: { type: String, required: true },
    t: { type: Date, default: Date.now },
    w: { type: Number, required: true },
    h: { type: String, required: true },
    p1: { type: Number, required: true },
    p25: { type: Number, required: true },
    p10: { type: Number, required: true }
});
const IS = mongoose.model("IS", exports.InfoSchema);
exports.default = IS;
//# sourceMappingURL=book.js.map