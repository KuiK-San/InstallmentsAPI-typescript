"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const priceInstallments_1 = __importDefault(require("./priceInstallments"));
const PORT = process.env.PORT || 4000;
const HOSTNAME = process.env.HOSTNAME || 'http://localhost';
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000']
}));
app.use(express_1.default.json());
app.use((req, res, next) => {
    console.log('request');
    next();
});
app.use(express_1.default.urlencoded({ extended: true }));
//app.use('/api', itensRouter)
app.use('/api', priceInstallments_1.default);
app.get('/', (req, res) => {
    res.send('123');
});
app.use((req, res) => {
    res.status(404);
});
app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`);
});
