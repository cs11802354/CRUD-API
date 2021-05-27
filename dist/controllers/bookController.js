"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addInfo = exports.updateInfo = exports.deleteInfo = exports.getInfo = exports.allInfo = void 0;
const dataMod_1 = require("../dataMod");
let allInfo = (req, res) => {
    let infos = dataMod_1.default.find((err, infos) => {
        if (err) {
            res.send("Error!");
        }
        else {
            res.send(infos);
        }
    });
};
exports.allInfo = allInfo;
let getInfo = (req, res) => {
    let info = dataMod_1.default.findById(req.params.id, (err, info) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(info);
        }
    });
};
exports.getInfo = getInfo;
let deleteInfo = (req, res) => {
    let info = dataMod_1.default.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send("Successfully Deleted Info");
        }
    });
};
exports.deleteInfo = deleteInfo;
let updateInfo = (req, res) => {
    console.log(req.body);
    let info = dataMod_1.default.findByIdAndUpdate(req.params.id, req.body, (err, info) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send("Successfully updated Info!");
        }
    });
};
exports.updateInfo = updateInfo;
let addInfo = (req, res) => {
    var newInfo = new dataMod_1.default(req.body);
    newInfo.save((err) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(newInfo);
        }
    });
};
exports.addInfo = addInfo;
//# sourceMappingURL=bookController.js.map