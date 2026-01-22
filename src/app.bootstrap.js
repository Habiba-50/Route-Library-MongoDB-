import { NODE_ENV, port } from "../config/config.service.js";
import { connectDB } from "./DB/connection.db.js";

// import { authRouter, userRouter } from './modules/index.js'
import express from "express";
import { bookRouter } from "./modules/book/index.js";
import { authorRouter} from "./modules/index.js";
import { logRouter } from "./modules/log/index.js";

async function bootstrap() {
  const app = express();
  //convert buffer data
  app.use(express.json());

  //DB
  await connectDB();

  //application routing
  app.get("/", (req, res) => res.send("Hello World!"));
    app.use("/books", bookRouter);
    app.use("/collection/books", bookRouter);
    app.use("/collection", authorRouter);
    app.use("/logs", logRouter);
  

  //invalid routing
  app.use("{/*dummy}", (req, res) => {
    return res.status(404).json({ message: "Invalid application routing" });
  });

  //error-handling
  app.use((error, req, res, next) => {
    const status = error.cause?.status ?? 500;
    return res.status(status).json({
      error_message:
        status == 500
          ? "something went wrong"
          : (error.message ?? "something went wrong"),
      stack: NODE_ENV == "development" ? error.stack : undefined,
    });
  });

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
}
export default bootstrap;
