import express, { Application, Response, Request } from "express";
import { Router } from "./routes";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", Router.messageRouter);
app.all("*", (req: Request, res: Response) => {
  res.status(404).json({ message: "requested route not found" });
});

export default app;
