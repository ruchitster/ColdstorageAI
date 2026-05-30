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



if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`🚀 Backend running on port ${PORT}`);
  });
}