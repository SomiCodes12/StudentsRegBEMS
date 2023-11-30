import nodemailer from "nodemailer"
import {google} from "googleapis"
import ejs from "ejs"
import patth from "path"

const GOOGLE_ID = "347489271632-vcd7j2uphrrgnrtn6un41emrhids3k2e.apps.googleusercontent.com"

const GOOGLE_SECRET = "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"

const GOOGLE_REFRESHTOKEN = "1//04vrS0Rqzc4PGCgYIARAAGAQSNwF-L9IrPbosV7yrN31bMIEZkcrQHwdJE_USD5jEavY0uQiM0QfYpq5R4OAEc9W3svTQLJJaTA4"

const GOOGLE_URL = "https://developer.google.com/oauthplayground"


const oAuth = new google.auth.OAuth2(GOOGLE_ID , GOOGLE_SECRET ,  GOOGLE_URL);

oAuth.setCredentials({access_token : GOOGLE_REFRESHTOKEN});

const url : string = "http://localhost:1234"

export const registrationMail = async (user : any) => {
    try {
        const accessToken = (await oAuth.getAccessToken()).token;

        const transport = nodemailer.createTransport({
            service : "gmail",
            auth : {
                type : "OAuth2",
                user : "somtochukwue98@gmail.com",
                clientId : GOOGLE_ID,
                clientSecret : GOOGLE_SECRET,
                refreshToken : GOOGLE_REFRESHTOKEN,
                accessToken,
            }
        });

        const data = {
            email : user.email,
            userName : user.userName,
            url : `${url}/api/${user.id}/verified`
        };

        const dataPath = patth.join(__dirname , "../Views/Registration.ejs");

        const fileRender = ejs.renderFile(dataPath , data);

        const mailer = {
            from : "somtochukwue98@gmail.com",
            to : user?.email,
            subject : "Student Registration",
            html : fileRender
        };

        transport.sendMail(mailer)

    } catch (error) {
        console.log(error);
    }
}


