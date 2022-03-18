"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const typeorm_1 = require("typeorm");
const connectDatabase = () => {
    (0, typeorm_1.createConnection)().then(() => {
        console.log("Database Connected");
    });
};
exports.connectDatabase = connectDatabase;
