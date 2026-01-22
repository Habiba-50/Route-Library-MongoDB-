import { Router } from "express";
import { createAuthor } from "./author.service.js";


const router=Router()

router.post("/authors", async (req, res, next) => {
    
    const result = await createAuthor(req.body);
    return res.status(201).json({message:"Author Done" , result})
})
export default router