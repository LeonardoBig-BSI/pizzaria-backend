import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import 'dotenv/config';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

import { router } from './routes';
import fileUpload from 'express-fileupload';

const app = express();
app.use(express.json());
app.use(cors());
app.use(fileUpload({
    limits: {
        fileSize: 50 * 1024 * 1024 //50MB
    }
}));
app.use(router);

// Acessar imagens no browser
const tmpFolder = path.resolve(process.cwd(), 'tmp');
if (!fs.existsSync(tmpFolder)) {
  fs.mkdirSync(tmpFolder);
  console.log('Pasta tmp criada automaticamente');
}

app.use('/files', express.static(tmpFolder));

// middleware
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if(error instanceof Error) {
        return res.status(400).json({
            error: error.message
        })
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.',
    })
});

app.listen(process.env.PORT, () => console.log("Servidor online!"));