import passport from "passport";
const CLIENT_ID = "981511888696-hdgqprvls92mp2ov9baku2sajt9b6obq.apps.googleusercontent.com"
const CLIENTSECRET = "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"

let GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENTSECRET,
      callbackURL: "http://localhost:2468/google/callback",
      // callbackURL: environemtVariable.CALLBACKURL,
      passReqToCallback: true,
    },

    async (request, accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser((user, done) => {
  return done(null, user);
});