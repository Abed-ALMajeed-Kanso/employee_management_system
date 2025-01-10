import * as dotenv from 'dotenv';
import * as cors from 'cors';
import * as express from 'express';
import { connectToDatabase } from './database';
import { employeeRouter } from './employee.routes';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: '*',
  credentials: true,
}));

const {MONGO_URL} = process.env

if(!MONGO_URL){
    console.error('URL Empty');
    process.exit(1);
}

connectToDatabase(MONGO_URL)
    .then(() =>{
        const app = express();
        app.use(cors());

        app.use("/employees", employeeRouter);
        app.listen(5200, () =>{
            console.log("server running at", process.env.MONGO_URL);
        })
    })
    .catch(error => console.error(error))

