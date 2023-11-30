import passport from "passport"
import github from "passport-github2"
const GITHUB_CLIENT_SECRET = "67c8f4024db00bb7cc54f4a3dc0cfd64e57889f0"
const GITHUB_CLIENT_ID= "ad9afd40ab0fcde180a1"

const GitHubStrategy = github.Strategy

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:2468/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null , profile)
  }
));

passport.serializeUser((user , done) => {
    return done(null , user)
}) 

passport.deserializeUser((user , done) => {
    return done(null , user)
}) 