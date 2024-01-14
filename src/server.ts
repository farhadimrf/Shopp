import express from "express";
import { getPayLoadClient } from "./get-payload";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const start = async () => {
   const payload = await getPayLoadClient({
      initOptions: {
         express: app,
         onInit: async (cms) => {
            cms.logger.info(`Admin URL ${cms.getAdminURL()}`);
         },
      },
   });
};

start();
