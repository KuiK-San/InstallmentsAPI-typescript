"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const InstallmentApi = express_1.default.Router();
const getMaxInstallments = ({ price, maxInstallments, minInstallmentValue }) => {
    for (let i = 1; i <= maxInstallments; i++) {
        if (price / i < minInstallmentValue) {
            console.log(price / i);
            return i;
        }
    }
    return maxInstallments;
};
InstallmentApi.post('/installment-values/', (req, res) => {
    try {
        const body = req.body;
        const maxInstallments = getMaxInstallments(body);
        const response = [];
        for (let i = 1; i <= maxInstallments; i++) {
            const hasInterest = i > body.minorInstallmentsInterest;
            let price;
            if (hasInterest && i >= body.majorInterestValue) {
                price = (body.price / i) + ((body.majorIntallmentsInterest / 100) * body.price);
                response.push({
                    "interest": body.majorIntallmentsInterest,
                    "portion": i,
                    "price": price
                });
            }
            else if (hasInterest && i >= body.minorInterestValue) {
                price = (body.price / i) + ((body.minorInstallmentsInterest / 100) * body.price);
                response.push({
                    "interest": body.minorInstallmentsInterest,
                    "portion": i,
                    "price": price
                });
            }
            else {
                price = (body.price / i);
                response.push({
                    "portion": i,
                    "price": price
                });
            }
        }
        res.json({
            "data": response
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.default = InstallmentApi;
