import { authorModel } from "../../DB/model/author.model.js"

export const createAuthor = async (inputs) => {
    const result = await authorModel.insertOne(inputs)
    return result
}