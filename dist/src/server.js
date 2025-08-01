"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const routes_1 = require("./routes");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, express_fileupload_1.default)({
    limits: {
        fileSize: 50 * 1024 * 1024 //50MB
    }
}));
app.use(routes_1.router);
// Acessar imagens no browser
const tmpFolder = path_1.default.resolve(process.cwd(), 'tmp');
if (!fs_1.default.existsSync(tmpFolder)) {
    fs_1.default.mkdirSync(tmpFolder);
    console.log('Pasta tmp criada automaticamente');
}
app.use('/files', express_1.default.static(tmpFolder));
// middleware
app.use((error, req, res, next) => {
    if (error instanceof Error) {
        return res.status(400).json({
            error: error.message
        });
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.',
    });
});
app.listen(process.env.PORT, () => console.log("Servidor online!"));
