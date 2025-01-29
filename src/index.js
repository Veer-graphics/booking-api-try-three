import express from "express";
import * as Sentry from "@sentry/node";
import "dotenv/config";
import winston from "winston";
import loginRouter from './routes/login.js';
import userRouter from './routes/users.js';
import hostRouter from './routes/hosts.js';
import propertyRouter from './routes/properties.js';
import amenitiesRouter from './routes/amenities.js';
import reviewsRouter from './routes/reviews.js';
import bookingRouter from './routes/bookings.js';

// Initialize Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN, // Add your Sentry DSN here
  environment: process.env.NODE_ENV || "development",
  tracesSampleRate: 1.0, // Adjust as needed
});

const app = express();
app.use(express.json());

// Sentry request handler
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

// Winston Logger configuration
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
});

// Middleware to log each request
app.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/login', loginRouter);
app.use('/users', userRouter);
app.use('/hosts', hostRouter);
app.use('/properties', propertyRouter);
app.use('/amenities', amenitiesRouter);
app.use('/reviews', reviewsRouter);
app.use('/bookings', bookingRouter);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

// Sentry error handler
app.use(Sentry.Handlers.errorHandler());

// Custom error handler
app.use((err, req, res, next) => {
  logger.error(`${err.message} - ${req.method} ${req.url}`);
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
});

// Start server
app.listen(3000, () => {
  logger.info("Server is listening on port 3000");
});
