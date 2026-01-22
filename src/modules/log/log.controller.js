import { Router } from "express";
import { createLogs } from "./log.service.js";


const router = Router()

// Insert a new log into the logs collection.
router.post("/", async (req, res, next) => {
    
    const result = await createLogs(req.body);
    return res.status(201).json({message:"log Done" , result})
})
export default router