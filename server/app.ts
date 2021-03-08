import express, { Response, Request } from "express";
import * as bodyParser  from "body-parser";
import mongoose from "mongoose";
import routes from "./routes";
import dotenv from "dotenv";
// import * as cors from 'cors';

console.clear();
dotenv.config();
const app = express();
/* Resolving POST, PUT, DELETE */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS
const cors = require('cors');
//app.options('*', cors());
app.use('*', cors());

app.use("/api", routes);

app.use(function(req: Request, res: Response) {
   res.status(404).send('Sorry cant find that!');
});

const dbUrl = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@` +
  `${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
console.log(`Connection to: ${dbUrl}`)
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => {
  console.log('Connecting to db is successful!');
  app.listen(Number(process.env.APP_PORT) || 3000, () => {
    console.log('App is listened on port 3000! ')
  });
}).catch((e) => {
  console.log(e);
  console.log('DATABASE ERROR');
});
