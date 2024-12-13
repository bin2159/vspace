import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import User from '../models/User.js'
import { google } from 'googleapis'

function generateRandomUsername(length = 8) {
  const adjectives = ['Fast', 'Lucky', 'Silent', 'Brave', 'Clever', 'Happy', 'Quick', 'Fierce', 'Wild', 'Bright'];
  const nouns = ['Tiger', 'Eagle', 'Shark', 'Falcon', 'Bear', 'Lion', 'Wolf', 'Dragon', 'Hawk', 'Phoenix'];
  const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';

  // Randomly choose an adjective, a noun, a random 2-digit number, and a special character
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(Math.random() * 90) + 10; // Random 2-digit number (10-99)
  const specialChar = specialChars[Math.floor(Math.random() * specialChars.length)];

  // Combine them to create a username
  const username = `${adjective}${noun}${number}${specialChar}`;

  return username;
}


// Local Strategy
passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username });

      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }

      const isMatch = await user.isValidPassword(password);

      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));
// Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = new User({
          username : "test",
          googleId: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          profileImage: profile.photos[0].value,
          accessToken: accessToken
        });
      } else {
        user.accessToken = accessToken;
      }

      await user.save();
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// Serialize and Deserialize User
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// Add this function to handle logout and Google session cleanup
passport.revokeGoogleTokens = async (user) => {
  if (user && user.googleId) {
    try {
      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        '/api/auth/google/callback'
      );
      await oauth2Client.revokeToken(user.accessToken);
    } catch (error) {
      console.error('Error revoking Google tokens:', error);
    }
  }
};

export default passport;