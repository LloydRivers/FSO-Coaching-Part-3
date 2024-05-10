import { Application } from "express";
import { IncomingMessage } from "http";
import morgan from "morgan";
/* I found the answer to the "IncomingMessage" type error here: 
https://dev.to/vassalloandreabetter-logs-for-expressjs-using-winston-and-morgan-with-typescript-516n
 */
interface MorganRequest extends IncomingMessage {
  body: {
    query: String;
  };
}

const setupMorgan = (app: Application): void => {
  const logger = morgan("tiny");
  app.use(logger);
  morgan.token("body", (req: MorganRequest, res) => JSON.stringify(req.body));
  app.use(
    morgan(
      ":method :url :status :res[content-length] - :response-time ms - :body"
    )
  );
};

export default setupMorgan;
