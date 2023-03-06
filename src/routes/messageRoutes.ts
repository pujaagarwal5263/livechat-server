import express from "express";
import { Msg } from "../controllers";

const messageRouter = express.Router();

messageRouter.route("/sendMessage").post(Msg.sendMessage);
messageRouter.route("/recieveMessage").post(Msg.recieveMessage);

export default messageRouter;
