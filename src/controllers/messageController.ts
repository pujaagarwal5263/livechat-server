import { RequestHandler } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { services } from "../services";

export const sendMessage: RequestHandler = async (req, res) => {
  const {
    eventName,
    message,
    userName,
  }: { eventName: string; message: string; userName: string } = req.body;
  try {
    if (eventName && message && userName) {
      await services.publish(eventName, message);
      return res.status(StatusCodes.CREATED).json({
        status: ReasonPhrases.CREATED,
        message: "message sent",
        data: { userName: userName, message: message, created_at: Date.now() },
      });
    }
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: ReasonPhrases.BAD_REQUEST,
      message: "please provide all the required fields",
    });
  } catch (err: any) {
    return res.status(StatusCodes.BAD_GATEWAY).json({
      status: ReasonPhrases.BAD_GATEWAY,
      message: "message not sent",
    });
  }
};

export const recieveMessage: RequestHandler = async (req, res) => {
  const { eventName }: { eventName: string } = req.body;
  services.subscribe(eventName, (msg: string) => {
    console.log(msg);
  });

  return res.status(StatusCodes.OK).json({
    message:"message sent"
  })
};
