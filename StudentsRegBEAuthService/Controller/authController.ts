import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { token } from "morgan";
// import { RegisterStudent } from "../Utils/validator";
import { registrationMail } from "../Utils/email";

const prisma = new PrismaClient();

export const registerStudent = async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const token = jwt.sign({ hashed }, "secret");
    const user = await prisma.authModel.create({
      data: {
        userName,
        email,
        password: hashed,
        token:token,
        details: [],
      },
    });

    console.log(user)
    
    registrationMail(user).then(() => {
      console.log("Mail Sent");
    });

    return res.status(200).json({
      message: "Created User Succesfully",
      data: user,
    });
  } catch (error:any) {
    return res.status(400).json({
      message: "Error Creating User",
      data : error.message,
      error
    });
  }
};

export const verifyStudent = async (req : Request , res : Response) => {
  try {
    const { userID } = req.params;
    
    const user = await prisma.authModel.findUnique({
      where : {
        id : userID
      }
    });

    if (user?.token !== "") {
      const studentData = await prisma.authModel.update({
        where : {id : userID},
        data : {
          verified : true,
          token : ""
        }
      });
      return res.status(200).json({
        message : "Verified Student Successfully",
        data : studentData
      })
    } else {
      return res.status(201).json({
        message: "User Not Found"
      });
    }
  } catch (error) {
    return res.status(400).json({
      message : "Error Verifying Student"
    })
  }
};

export const signInStudent = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.authModel.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      const checkPassword = await bcrypt.compare(password, user.password);
      if (checkPassword) {
        if (user.verified && user.token === "") {
          const token = jwt.sign({id : user.id} , "tokenSecret");

          req.headers.authorization = `Bearer ${token}`;

          return res.status(200).json({
            message : "Signed in Student successfully",
            data : token
          })
        } else {
          return res.status(201).json({
            message: "You ain't verified yet ",
          });
        }
      } else {
        return res.status(201).json({
          message: "Incorrect Password",
        });
      }
    } else {
      return res.status(400).json({
        message: "User Not Found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Error Creating User",
    });
  }
};

export const getAllStudents = async (req : Request , res : Response) => {
  try {
    const user  = await prisma.authModel.findMany({});
    return res.status(400).json({
      message : "Gotten all Users Successfully",
      data : user
    })
  } catch (error) {
    return res.status(400).json({
      message : "Error Getting all Users"
    })
  }
}

export const getOneStudent = async (req : Request , res : Response) => {
  try {
    const { studentID } = req.params;

    const student = await prisma.authModel.findUnique({
      where : {
        id : studentID
      }
    });

    return res.status(200).json({
      message : "Found One Student Successfully",
      data : student
    })
  } catch (error) {
    return res.status(400).json({
      message : "Error getting One Student"
    })
  }
}