require('dotenv').config();
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github';
import { getUserByEmail, getUserById, getUserBySocialAuthId } from '../services/user.service';
import UserModel from '../models/user.model';
import cloudinary from 'cloudinary';

export const configureSocialAuthStrategy = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await getUserById(id as string);
        done(null, user);
    });

    // Google OAuth Strategy
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
        async (_accessToken, _refreshToken, profile, done) => {
            // Handle user data after successful Google authentication
            // Example: You can save user data to your database or perform any other action
            const email = profile.emails?.[0].value;
            let user = await getUserBySocialAuthId(profile.id);
            if (!user) {
                user = await getUserByEmail(email as string);
            }
            // If user doesn't exist creates a new user. (similar to sign up)
            if (!user) {
                const firstName = profile.name?.givenName;
                const lastName = profile.name?.familyName;
                const avatar = profile._json.picture;

                let savedAvatar;
                if (!!avatar) {
                    const avatarCloud = await cloudinary.v2.uploader.upload(avatar, {
                        folder: "avatars"
                    });
                    savedAvatar = {
                        public_id: avatarCloud.public_id,
                        url: avatarCloud.secure_url
                    }
                }

                const newUser = await UserModel.create({
                    socialAuthId: profile.id,
                    firstName: firstName ?? '',
                    lastName: lastName ?? '',
                    avatar: savedAvatar,
                    email: email,
                    // we are using optional chaining because profile.emails may be undefined.
                });
                if (newUser) {
                    return done(null, newUser);
                }
            } else {
                return done(null, user);
            }
        }));

    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID || '',
        clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
        callbackURL: process.env.GITHUB_CALLBACK_URL,
    }, async (_accessToken, _refreshToken, profile, done) => {
        // You can handle the GitHub profile data here
        // Save user information to your database if needed
        const email = profile.emails?.[0].value;
        let user = await getUserBySocialAuthId(profile.id);
        if (!user) {
            user = await getUserByEmail(email as string);
        }
        // If user doesn't exist creates a new user. (similar to sign up)
        if (!user) {
            const nameArray = profile.displayName.split(' ');
            const firstName = nameArray[0];
            const lastName = nameArray.slice(1).join(' ');
            const avatar = (profile._json as any).avatar_url;
            const email = profile.emails?.[0].value;

            let savedAvatar;
            if (!!avatar) {
                const avatarCloud = await cloudinary.v2.uploader.upload(avatar, {
                    folder: "avatars"
                });
                savedAvatar = {
                    public_id: avatarCloud.public_id,
                    url: avatarCloud.secure_url
                }
            }

            const newUser = await UserModel.create({
                socialAuthId: profile.id,
                firstName: firstName ?? '',
                lastName: lastName ?? '',
                avatar: savedAvatar,
                email: email,
                // we are using optional chaining because profile.emails may be undefined.
            });
            if (newUser) {
                return done(null, newUser);
            }
        } else {
            return done(null, user);
        }
    }));

};