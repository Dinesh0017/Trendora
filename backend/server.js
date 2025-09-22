import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';

//App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//middlewares
app.use(cors());
app.use(express.json());

//API endpoints
app.get('/', (req, res) => {
    res.send('API working') // on browser, it will show API working
});

//Listener
app.listen(port, () => console.log(`Listening on localhost:${port}`)); //showing in terminal
