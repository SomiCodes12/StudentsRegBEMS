import express, { Application  , Request , Response} from "express"
// import cors from "cors"
import info from "./Router/InfoRouter";

const app : Application = express();

const port : number = 1234;

app.set("view_engine" , "ejs")

app.use(express.json())
// app.use(cors())

app.use("/api/v1" , info)

app.get ("/" , (req : Request , res : Response) => {
    try {
        return res.status(200).json({
            message : "Awesome"
        })
    } catch (error) {
        return res.status(400).json({
            message : "Error"
        })
    }
})

export const server = app.listen(port , () => {
    console.log("Info Service Connected");
})