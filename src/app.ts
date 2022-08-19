import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import APIRoutes from './routes/api';

dotenv.config();

const server = express();

server.use(express.static(path.join(__dirname, "../public")));
server.use(express.urlencoded({ extended: true }));

server.use(APIRoutes);

export default server;