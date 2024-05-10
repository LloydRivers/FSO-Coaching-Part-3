import { Application } from "express";
import { Server } from "http";

const startServer = (port: number, app: Application): Server => {
  return app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

export default startServer;
