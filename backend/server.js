import app from "./app.js";

import morgan from "morgan";

import logger from "./utils/logger.js";



app.use(

  morgan("dev", {

    stream: {

      write: (message) => logger.info(message.trim())

    }

  })

);



const PORT = process.env.PORT ;



app.listen(PORT, () => {

  logger.info(`Server running on port ${PORT}`);

});