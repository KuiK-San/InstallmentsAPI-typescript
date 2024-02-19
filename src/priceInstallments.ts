import express from 'express'
import { url } from 'inspector';
import { urlToHttpOptions } from 'url';

const InstallmentApi = express.Router()

interface priceRequest {
    price: number,
    maxInstallments: number,
    minInstallmentValue: number,
    minorInterestValue: number,
    minorInstallmentsInterest: number,
    majorInterestValue: number, 
    majorIntallmentsInterest: number

}

interface installment {
    portion: number,
    price: number,
    interest?: number
    
}

const getMaxInstallments = ({ price, maxInstallments, minInstallmentValue }: priceRequest) => {
    for(let i = 1; i <= maxInstallments; i++ ){
        
        if(price / i < minInstallmentValue) {
            console.log(price/i)
            return i
        }

    }
    return maxInstallments

};


InstallmentApi.post('/installment-values/', (req, res) => {
    try {
    const body: priceRequest = req.body

    const maxInstallments: number = getMaxInstallments(body)
    const response: installment[] = []

    for(let i = 1; i <= maxInstallments; i++){
        const hasInterest: boolean = i > body.minorInstallmentsInterest
        let price: number
    
        if (hasInterest && i >= body.majorInterestValue) {
            price = (body.price / i) + ((body.majorIntallmentsInterest / 100) * body.price)
            response.push({
                "interest": body.majorIntallmentsInterest,
                "portion": i,
                "price": price
            })

        }else if (hasInterest && i >= body.minorInterestValue) {
            price = (body.price / i ) + ((body.minorInstallmentsInterest / 100) * body.price)
            response.push({
                "interest": body.minorInstallmentsInterest,
                "portion": i,
                "price": price
            })
        }else {
            price = (body.price / i)
            response.push({
                "portion": i,
                "price": price
            })
        }
        
    }
    
    res.json({
        "data": response
    })
    } catch (err) {
        console.log(err)
    }
    


})

export default InstallmentApi



