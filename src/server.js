import { Model } from 'objection';
import Knex from 'knex';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { OpenApiValidator } from 'express-openapi-validator';
import { urlencoded, text, json } from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';

import routes from './routes';
import swaggerDef from './swagger/swaggerDef';
import config from '../knexfile';
import pkg from '../package.json';

const port = process.env.PORT || 8080;
const host = process.env.HOSTNAME || '0.0.0.0';

export default async () => {
  const environment = process.env.NODE_ENV || 'development';
  // Initialize knex
  const knex = Knex(config[environment]);
  // Bind all models to knex
  Model.knex(knex);

  const app = Object.assign(express(), {
    pkgname: pkg.name,
    version: pkg.version
  });

  app.use(urlencoded({ extended: false }));
  app.use(text());
  app.use(json());
  app.use(cookieParser());
  app.use(passport.initialize());

  const specs = swaggerJSDoc({
    swaggerDefinition: swaggerDef,
    apis: ['./src/routes/*.js']
  });

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

  await new OpenApiValidator({
    apiSpec: specs,
    validateRequests: true,
    validateResponses: true
  }).install(app);

  app.use('/', routes);

  // 404 Handler
  app.use((req, res) => {
    res.status(404).send('Not Found');
  });

  // TODO: Not sure if we really need this - delete ?
  app.use((err, req, res) => {
    // format error
    res.status(err.status || 500).json({
      message: err.message,
      errors: err.errors
    });
  });

  // Launch Node.js server
  const server = app.listen(port, host, () => {
    // eslint-disable-next-line no-console
    console.log(`Node.js API server is listening on http://${host}:${port}/`);
  });

  return server;
};
