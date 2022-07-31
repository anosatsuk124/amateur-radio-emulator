import * as ws from "ws";
import express from 'express';
import * as fs from 'fs';

const app = express();
const wss = new ws.Server({ port: 8000 });

app.listen(8080);