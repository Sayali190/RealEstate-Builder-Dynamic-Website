import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: "http://localhost:5000/auth/google/callback" // backend route
  },
  function(accessToken, refreshToken, profile, done) {
    // User find/create logic
    // तुझ्या in-memory store किंवा MongoDB मध्ये save करु शकतो
    const user = {
      id: profile.id,
      name: profile.displayName,
      email: profile.emails ? profile.emails[0].value : "",
    };
    return done(null, user);
  }
));

passport.serializeUser(function(user: any, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id: string, done) {
  done(null, id); // सध्या simple, production मध्ये DB lookup करा
});
