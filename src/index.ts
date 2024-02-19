import express from 'express'
import cors from 'cors'
import itensRouter from './itemRoutes'
import InstallmentApi from './priceInstallments'


const PORT = process.env.PORT || 4000

const HOSTNAME = process.env.HOSTNAME || 'http://localhost'

const app = express()


app.use(cors({
    origin: ['http://localhost:3000']
}))
app.use(express.json());

app.use((req, res, next) => {
    console.log('request')
    next()
})

app.use(express.urlencoded({ extended: true }));
//app.use('/api', itensRouter)
app.use('/api', InstallmentApi)



app.get('/', (req, res)=> {
    res.send('123')
})

app.use((req, res) => {
    res.status(404)
})


app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`)
})