import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import * as dotenv from "dotenv";
dotenv.config();

export const ARCJET_CLIENT = "ARCJET_CLIENT";

export const arcjetProvider = {
  provide: ARCJET_CLIENT,
  useValue: arcjet({
    key: process.env.ARCJET_KEY!,
    rules: [
      shield({ mode: "LIVE" }), // blocks SQLi, XSS, etc.
      detectBot({
        mode: "LIVE",
        allow: ["CATEGORY:SEARCH_ENGINE", "POSTMAN"], // allow Google/Bing bots, block others
      }),
      tokenBucket({
        mode: "LIVE",
        refillRate: 1,      // 5 tokens added
        interval: 3,       // every 10 seconds
        capacity: 1,       // bucket holds max 10
      }),
    ],
  }),
};