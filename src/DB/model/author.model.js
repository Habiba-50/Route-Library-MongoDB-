import { db } from "../connection.db.js";


export const authorModel = await db.createCollection("authors")