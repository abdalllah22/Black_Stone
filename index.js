const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const winston = require("winston");

require('dotenv/config');

// routes
const users = require('./routes/users');
const cars = require('./routes/cars');
const error = require('./middleware/error');


const app = express();
const port = 3000;

app.use(cors());

// middleware
app.use(express.json());
app.use(error);

app.use("/api/users", users);
app.use("/api/cars", cars);


//* Handel uncaught exceptions
winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "logFile.log" })
);
// * Handel unhandled rejections
process.on("unhandledRejection", (ex) => {
    throw ex;
});
winston.add(
    new winston.transports.Console({ colorize: true, prettyPrint: true })
);
winston.add(new winston.transports.File({ filename: "logFile.log" }));


mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log('Database Connection is ready... ')
})
.catch((err)=>{
    console.log(err);
    console.log("---> Database Connection is not ready <---")
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    console.log(`Server listening on port ${port}`)
});

