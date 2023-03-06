import { SDK } from "sdk-all";

const init = new SDK();
(async () => {
  try {
    init.initialize({ appMedium: "socket", appName: "" });
  } catch (err: any) {
    console.log("init  " + err);
  }
})();

export const publish: Function = (eventName: string, message: string) => {
  init.publish(eventName, message);
};      

export const subscribe: Function = (
  eventName: string,
  message: CallableFunction
) => {
  init.subscribe(eventName, message);
};
