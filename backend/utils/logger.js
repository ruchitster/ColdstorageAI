import winston from "winston";

const logger = winston.createLogger({

  level: "info",

  format: winston.format.combine(

    winston.format.timestamp(),

    winston.format.errors({ stack: true }),

    winston.format.json()

  ),

  transports: [

    // ✅ Console logs
    new winston.transports.Console(),

    // ✅ Error log file
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error"
    }),

    // ✅ Combined log file
    new winston.transports.File({
      filename: "logs/combined.log"
    })

  ]

});

export default logger;