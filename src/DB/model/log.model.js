import { db } from "../connection.db.js";


export const logModel = await db.createCollection("logs", {
  capped: true,
  size: 1024 * 1024,
});