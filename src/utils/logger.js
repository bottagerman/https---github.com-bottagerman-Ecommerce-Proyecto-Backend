import winston from "winston";

export const loggerProd = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: "info",
      format: winston.format.colorize({ all: true }),
    }),
    new winston.transports.File({
      filename: "./errors.log",
      level: "warn",
      format: winston.format.simple(),
    }),
  ],
});
export const loggerDev = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.colorize({ all: true }),
    }),
    new winston.transports.File({
      filename: "./errors.log",
      level: "warn",
      format: winston.format.simple(),
    }),
  ],
});
