import express , { Application , Request ,Response} from "express"
import { appConfig } from "./mainApp";
import cors from "cors"
import auth from "./Router/authRouter"
import "./Utils/github"
import passport from  "passport"
import session from "session"

const port : number = 2468;

const app : Application = express();
appConfig(app)

app
.use(cors())
.use(express.json())

app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
app.use("/api/v1" , auth)
.set("view_engine" , "ejs");



app.get("/google", (req: Request, res: Response) => {
    res.send(`<a href= "/veri/google">Authenicate with google</a>`);
  });

  app.get(
    "/veri/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
  );
  app.get(
    "/google/callback",
    passport.authenticate("google", {
      successRedirect: "http://localhost:3000/Home/",
      failureRedirect: "/google/callback/failure",
    })
  );

  app.get("/google/callback/protect", (req: any, res: any) => {
    return res.send(`hello ${req?.user?.displayName}`);
  });
  app.get("/google/callback/failure", (req, res) => {
    return res.send("failed to authnticate");
  });

app.get("/github" , (req : Request , res : Response) => {
    res.send(`<a href="/veri/github">Authenticate with github </a>`)
});

app.get(
    "/veri/github",
    passport.authenticate("github" , {scope: ["user : email"]})
);

app.get(
    "/github/callback", 
    passport.authenticate("github" , {
        successRedirect : "http://localhost:5173/home",
        failureRedirect : "/github/callback/failure"
    })
)

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

const server = app.listen(port , () => {
    console.log("Server is up and Running");
})

process.on("uncaughtexception" , (reason : any) => {
    console.log(`Server is shutting down due to uncaughtexception : ${reason}`);
    process.exit(1)
})

process.on("unHandledRejection" , (error : any) => {
    console.log(`Server is shutting down due to unHandledRejection : ${error}`);
   server.close(() => {
    process.exit(1)
   })
})