"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookSchema = void 0;
const mongoose = require("mongoose");
const uri = 'mongodb://127.0.0.1:27017/local';
mongoose.connect(uri, (err) => {
    if (err) {
        console.log(err.message);
    }
    else {
        console.log("successfully connected to MonogDB");
    }
});
exports.BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true }
});
const Book = mongoose.model("Book", exports.BookSchema);
exports.default = Book;
//# sourceMappingURL=data.js.map