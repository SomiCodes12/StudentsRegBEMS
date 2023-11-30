import {Request , Response , NextFunction} from "express"
import jwt from "jsonwebtoken"

export const verified = async (req : any , res : Response , next : NextFunction) => {
    try {
     const fakeToken = req.headers.authorization;
        if (fakeToken) {
        const realToken = fakeToken.split(" ")[1];
        if (realToken) {
            jwt.verify(realToken , "tokenSecret", (err , payload : any) => {
                if (err) {
                    return res.status(400).json({
                        message : "Invalid Token"
                    })
                } else {
                    req.user = payload;
                    next()
                }
            })
        } else {
            return res.status(400).json({
                message : "There's sth wrong with your token"
            })
        }
        } else {
            return res.status(400).json({
                message : "You ain't authorized here"
            })
        }
    } catch (error) {
        return res.status(400).json({
            message : "Verification Error"
        })
    }
}