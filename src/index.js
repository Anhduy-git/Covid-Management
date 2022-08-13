const express = require('express');
const connectDB = require('./db/db-connect');
const {InternalServerError} = require('./errors');
require('dotenv').config();
//auto catch async errors
require('express-async-errors');

const userManagerRouter = require('./routers/User/user-manager');
const userRouter = require('./routers/User/user');
const treatmentPlaceRouter = require('./routers/TreatmentPlace/treatment-place');
const necessaryRouter = require('./routers/Necessary/necessary');
const necessaryPackageRouter = require('./routers/Necessary/necessary-package');

const errorHandlerMiddleware = require('./middlewares/error-handler');

const app = express();


//parse req.body to js object
app.use(express.json()); 

//routers
app.use('/managers', userManagerRouter); 
app.use('/users', userRouter);
app.use('/treatmentPlaces', treatmentPlaceRouter);
app.use('/necessaries', necessaryRouter);
app.use('/necessaryPackages', necessaryPackageRouter);

//error handlers
app.use(errorHandlerMiddleware); 


const port = process.env.PORT;
const startServer = async () => {
    try {
      await(connectDB(process.env.MONGODB_URL));      
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {        
        throw new InternalServerError("Something went wrong, try again later");
    }
  };
  
startServer();

