const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConnect = require('./config/dbconnect');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000;


const router = require('./routes/authroutes');
const animalrouter = require('./routes/Animalroutes');
const ownerrouter = require('./routes/Ownerroutes');
const orgrouter = require('./routes/Orgroutes');

const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
dbConnect();

app.use(morgan("dev"));
app.use(bodyParser.json());


app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors({
 
 credentials: true,
 origin: "https://animaldbclient.onrender.com"

}));

app.use('/api/user', router);
app.use('/api/animal', animalrouter);
app.use('/api/owner', ownerrouter);
app.use('/api/org', orgrouter);


app.use(notFound);
app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log(`server running at ${PORT}`);
});





