const mongoose = require('mongoose')


module.exports = () => {
    mongoose.connect(process.env.MONGODB_URL, {
    dbName : process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(()=>{
    console.log('Mongodb connected...')
    })
    .catch(err => console.log(err.message))

mongoose.connection.on('connected', () => {
    console.log('Mongodb connected to db...')
})

mongoose.connection.on('error', err => console.log(err.message))

mongoose.connection.on('disconnected', () => {
    console.log('Mongodb disconnected...')
})

process.on('SIGINT', async() =>{
    await mongoose.connection.close(() => {
        console.log('Mongodb connection closed due to app termination...')
        process.exit(0)
        
    })
})
}