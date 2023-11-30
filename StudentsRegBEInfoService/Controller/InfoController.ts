import express, {Request , Response} from "express"
import { PrismaClient } from "@prisma/client"; 

const prisma = new PrismaClient();

export const createStudentInfo = async (req : any , res : Response) => {
    try {
    const {classe , age , lastName ,  birthDate , state , phoneNumber} = req.body;

    const { id } = req.user;

    const info = await prisma.infoModel.create({
        classe , age , lastName ,  birthDate , state , phoneNumber
    });

    return res.status(200).json({
        message : "Created Info Successfully",
        data : info
    })
    } catch (error) {
        return res.status(400).json({
            message : "Error Creating Student's Info",
            data : error
        })
    }
}

export const viewStudentsInfo = async (req : Request , res : Response) => {
    try {
        const info = await prisma.infoModel.findMany({})

    return res.status(200).json({
        message : "Found Students Info Successfully",
        data : info
    })
    } catch (error) {
        return res.status(400).json({
            message : "Error Creating Student's Info"
        })
    }
}

export const viewStudentInfo = async (req : Request , res : Response) => {
    try {
        const { studentID } = req.params;

        const info = await prisma.infoModel.findUnique({
            where : {
                id : studentID
            }
        })

    return res.status(200).json({
        message : "Found Students Info Successfully",
        data : info
    })
    } catch (error) {
        return res.status(400).json({
            message : "Error Creating Student's Info"
        })
    }
}