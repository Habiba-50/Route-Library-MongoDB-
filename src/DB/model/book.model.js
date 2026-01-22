import { db } from "../connection.db.js"



export const bookModel = await db.createCollection("books", {
      validator: {
        $jsonSchema: {
          required: ["title"],
          properties: {
            title: {
              bsonType: "string",
              minLength: 2,
              description: "title must be a non-empty string"
            }
          }
        }
    }
});