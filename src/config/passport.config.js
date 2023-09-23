import passport from 'passport';
import { UserModel } from '../DAO/models/users.models.js';
import fetch from 'node-fetch';
import GitHubStrategy from 'passport-github2';
import { loggerDev } from '../utils/logger.js';

export function iniPassport() {
  passport.use(
    'github',
    new GitHubStrategy(
      {
        clientID: 'Iv1.37b0b8a3567de779',
        clientSecret: '8c213e1ed9626225ad6171682cea5e93df461611',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback',
      },
      async (accesToken, _, profile, done) => {
        loggerDev.info(profile);
        try {
          const res = await fetch('https://api.github.com/user/emails', {
            headers: {
              Accept: 'application/vnd.github+json',
              Authorization: 'Bearer ' + accesToken,
              'X-Github-Api-Version': '2022-11-28',
            },
          });
          const emails = await res.json();
          const emailDetail = emails.find((email) => email.verified == true);

          if (!emailDetail) {
            return done(new Error('cannot get a valid email for this user'));
          }
          profile.email = emailDetail.email;

          let user = await UserModel.findOne({ email: profile.email });
          if (!user) {
            const newUser = {
              email: profile.email,
              firstName: profile._json.name || profile._json.login || 'noname',
              lastName: 'nolast',
              password: 'nopass',
              admin: false,
            };
            let userCreated = await UserModel.create(newUser);
            loggerDev.info('User Registration succesful');
            return done(null, userCreated);
          } else {
            loggerDev.warn('User already exists');
            return done(null, user);
          }
        } catch (e) {
          loggerDev.error('Error en auth github');
          loggerDev.error(e);
          return done(e);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await UserModel.findById(id);
    done(null, user);
  });
}