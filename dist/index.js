"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("./routes/user.routes");
const config_1 = __importDefault(require("./config/config"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = config_1.default.app.PORT;
app.use("/user", user_routes_1.userRoutes);
console.log("Hola");
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
