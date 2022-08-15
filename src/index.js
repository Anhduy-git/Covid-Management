const express = require('express');
const connectDB = require('./db/db-connect');
const initializeDB = require('./db/db-initialize');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const route = require('./routers');
require('dotenv').config();


const app = express();

//parse req.body to js object
app.use(express.json()); 

//initialize database (addresses, places of treament,..)
initializeDB();

//init routers
route(app);

//error handlers
app.use(errorHandlerMiddleware); 



const port = process.env.PORT;
const startServer = async () => {    
    try {
		await(connectDB(process.env.MONGODB_URL));      
		app.listen(port, () =>
			console.log(`Server is listening on port ${port}...`)
		);    
	} catch(err) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Internal Server Error" });
	}
};
  
startServer();

