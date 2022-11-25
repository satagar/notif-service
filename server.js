require('./crons/newCron');
require("dotenv").config()

const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./configs/db.config');
const routes = require('./routes/notificationRoutes');

const app = express();
const PORT = process.env.PORT;


mongoose.connect(dbConfig.DB_URL+dbConfig.DB_NAME, {family: 4}, (error) => {
    if(error){
        console.log('Error connecting to mongoDB')
    }
    else {
        console.log('connected');
        app.listen(PORT, () => {
            console.log(`Example app listening at port http://localhost:${PORT}`);
            app.get('/test', (req,res)=>{
                res.status(200).send({
                    message: 'success!'
                })
            });
            app.use(express.json())
            app.use('/', routes);
        });
    }
});