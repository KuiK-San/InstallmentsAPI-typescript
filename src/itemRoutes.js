"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const itensRouter = express_1.default.Router();
itensRouter.post('/itens', (req, res) => {
    res.send('Cria novo item');
});
itensRouter.get('/itens', (req, res) => {
    res.send('Lê todos os itens');
});
itensRouter.get('/itens/:id', (req, res) => {
    const id = +req.params.id;
    res.send(`Lê o item ${id}`);
});
itensRouter.put('/itens/:id', (req, res) => {
    const id = +req.params.id;
    res.send(`Atualiza o item ${id}`);
});
itensRouter.delete('/itens/:id', (req, res) => {
    const id = +req.params.id;
    res.send(`Apaga o item ${id}`);
});
exports.default = itensRouter;
