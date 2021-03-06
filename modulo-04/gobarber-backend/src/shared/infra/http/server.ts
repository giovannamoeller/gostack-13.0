import "reflect-metadata";
import 'dotenv/config';
import express, {Request, Response, NextFunction} from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';

import routes from './routes';
import uploadConfig from '../../../config/upload';
import AppError from '../../errors/AppError';
import RateLimiter from '../http/middlewares/RateLimiter';
import '@shared/infra/typeorm';
import '@shared/container';

const app = express();
app.use(cors());
app.use('/files', express.static(uploadConfig.uploadFolder));
app.use(RateLimiter);
app.use(express.json());
app.use(routes);

app.use(errors());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof AppError) { // o erro foi originado pela minha aplicação
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  } 
  console.log(err);
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
}); 

app.listen(3333, () => {
  console.log('Server is running');
});
