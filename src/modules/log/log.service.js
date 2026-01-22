import { logModel } from "../../DB/model/log.model.js"


export const createLogs = async (inputs) => {
    const result = await logModel.insertOne(inputs)
    return result 
}