import Express from "express";
import 'dotenv/config';
import fs from 'fs';
// Middleware configuration
import bodyParser from 'body-parser';
import myLogger from "./middlewares/middleware.js";
import auth from "./middlewares/middleware.js";


// Creating a new express instance
const app = Express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(myLogger)
// app.use(auth)
app.use(Express.static('static'))
const port = process.env.PORT || 3001;


// Listening to the PORT on which server is running
app.listen(port, ()=>{
    console.log("listening on port " + port);
})