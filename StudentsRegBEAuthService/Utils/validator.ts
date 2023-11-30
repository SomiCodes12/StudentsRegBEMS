import joi from "joi"

let regex =
  /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{6,33}$/;

export const RegisterStudent = joi.object({
    userName : joi.string().required(),
    email : joi.string().required(),
    password : joi.string().pattern(new RegExp(regex)).required(),
    confirm : joi.ref("password")
})

export const signInStudent = joi.object({
    email : joi.string().required(),
    password : joi.string().pattern(new RegExp(regex)).required()
})