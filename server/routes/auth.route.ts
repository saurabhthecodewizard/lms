import express from 'express';
import passport from 'passport';
import { attachTokenAndRedirect } from '../utils/jwt';
import GlobalErrorHandler from '../utils/ErrorHandler';

const authRouter = express.Router();

// Google OAuth routes
authRouter.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

authRouter.get('/auth/google/callback',
    passport.authenticate('google', {
        session: false,
        //successRedirect: 'http://localhost:3000/',  // Redirect to frontend URL
        failureRedirect: process.env.ORIGIN || 'http://localhost:3000/'   // Redirect to frontend URL
    }),
    (req, res, next) => {
        if (!req.user) {
            return next(new GlobalErrorHandler("Invalid Credentials", 400));
        }
        attachTokenAndRedirect(req.user, res);
    }
);


authRouter.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

authRouter.get('/auth/github/callback', passport.authenticate('github', {
    session: false,
    //successRedirect: 'http://localhost:3000/',  // Redirect to frontend URL
    failureRedirect: process.env.ORIGIN || 'http://localhost:3000/'   // Redirect to frontend URL
}),
    (req, res, next) => {
        if (!req.user) {
            return next(new GlobalErrorHandler("Invalid Credentials", 400));
        }
        attachTokenAndRedirect(req.user, res);
    }
);

export default authRouter;