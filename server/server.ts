import { app } from './app';
import { initializeSocketServer } from './socker.server';
import connectDB from './utils/db';
import cloudinary from 'cloudinary';
import http from 'http';
require('dotenv').config();

const server = http.createServer(app);

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY
});

initializeSocketServer(server);

server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
    connectDB();
})