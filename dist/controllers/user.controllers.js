"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getAllUser = void 0;
const getAllUser = (req, res) => {
    res.status(200).send("Get all user");
};
exports.getAllUser = getAllUser;
const createUser = (req, res) => {
    res.status(200).send("User created");
};
exports.createUser = createUser;
const updateUser = (req, res) => {
    res.status(200).send("User update");
};
exports.updateUser = updateUser;
const deleteUser = (req, res) => {
    res.status(200).send("User delate");
};
exports.deleteUser = deleteUser;
