import 'reflect-metadata';
import express, { Application, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import log from 'fancy-log';
import lusca from 'lusca';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import config from 'config';
import { HttpStatus } from './types/enums/HttpStatus';
import { EventType, LengooEmitter } from './Utils/Emittery';
import './database/DbConnection';

import routes from './routes';
import MailService from './modules/MailModule/MailService';

const { env } = config.get('general');
const isProduction = env === 'production';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
    this.errorHandler();
    this.loadEventListeners();
  }

  private middleware() {
    const corsOptions = {
      credentials: true,
      origin: [],
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    };

    this.app.use(cors(corsOptions));
    this.app.use(lusca.xframe('SAMEORIGIN'));
    this.app.use(lusca.xssProtection(true));

    // compression and header security middleware
    this.app.use(compression());
    this.app.use(helmet());

    this.app.use(morgan('dev'));

    this.app.use(
      bodyParser.urlencoded({
        limit: '50mb',
        extended: true,
      })
    );
    this.app.use(bodyParser.json());
    this.app.disable('x-powered-by');
  }

  private errorHandler() {
    // catch 404 and forward to error handler
    this.app.use((_req: Request, _res: Response, next: NextFunction) => {
      const err = new Error('Resource does not exist');
      next(err);
    });

    if (!isProduction) {
      this.app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
        log(err.stack);
        res.status(err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          status: false,
        });
      });
    }

    this.app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      return res.status(err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: err.message,
        status: false,
      });
    });
  }

  private routes() {
    this.app.use(routes);
  }

  private loadEventListeners() {
    LengooEmitter.addListener(EventType.SendEmail, async (payload) => {
      const { data, opts } = payload;
      const { receiver_email: email, filename } = opts;

      // @TODO: convert this to template
      const template = `<html>
        <head>
          <title>Subtitle is Ready</title>
        </head>
        
        <body>
          Hey ${email}, <br /> 
          <p>Your subtitle is ready, kindly see attached</p>
        </body>
      
      </html>`;

      MailService.sendEmail(email, template, 'Your subtitle is ready!', true, {
        filename,
        file_content: data,
      });
    });
  }
}

export default App;
