"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const items_router_1 = require("./items/items.router");
const app = (0, express_1.default)();
dotenv_1.default.config();
/*******************
 * ENV
 * *******************/
const databaseUrl = (_a = process.env.DATABASE_URL) !== null && _a !== void 0 ? _a : "";
const port = (_b = process.env.SERVER_PORT) !== null && _b !== void 0 ? _b : 3000;
/*******************
 * Configuration
 * *******************/
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
/*******************
 * DataBase
 * *******************/
void mongoose_1.default.connect(databaseUrl);
const database = mongoose_1.default.connection;
database.on("error", (error) => {
    console.log(error);
});
database.once("connected", () => {
    console.log("Database Connected");
});
/*******************
 * Routes
 * *******************/
app.use("/api/items", items_router_1.itemsRouter);
app.use((req, res, next) => {
    const error = new Error("not found");
    return res.status(404).json({
        message: error.message
    });
});
/*******************
 * Server
 * *******************/
app.listen(port, () => console.log(`The server is running on port ${port}`));
module.exports = app;
