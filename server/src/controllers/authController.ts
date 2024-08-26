import { RequestHandler } from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";

import { User } from "@/models/user";
import { toJson } from "@/resources/responseResource";
import { authToken } from "@/models/authToken";
import { SendEmail } from "@/utils/sendEmail";
import { PasswordResetTokenModel } from "@/models/passwordResetToken";
// import { Session } from "@/models/session";

/**
 * Register User
 * 1. Check if user is existed in database
 * 2. if not existed, create a user in db
 * 3. create a token for login
 * 4. send a verify email to the user
 * 5. return the response back
 */
export const createNewUser: RequestHandler = async (req, res) => {
  try {
    const { email } = req.body;

    const isUserExisted = await User.findOne({ email });
    if (isUserExisted) {
      return toJson(null, 400, "User with email is already registered", res);
    }

    const user = new User({
      ...req.body,
    });
    await user.save();

    //generate token for login
    const token = crypto.randomBytes(36).toString("hex");
    await authToken.create({
      owner: user._id,
      token,
    });
    const link = `https://bitesy.drazcoding.com/verify-user?id=${user._id}&token=${token}`;

    //verify email
    await SendEmail(
      user.email,
      "verification@bitesy.com",
      `<h1>Please click on <a href="${link}">this link</a> to verify your account</h1>`
    );

    toJson(
      { message: "We have sent verification to your email. Please verify it." },
      200,
      null,
      res
    );
  } catch {
    toJson(null, 500, "Server Error", res);
  }
};

/**
 * Verify Email
 * 1. get id and token from req body
 * 2. find the token in database if existed
 * 3. if no token, return error
 * 4. check the token is legit
 * 5. if token is legit, find the user and update the verified status
 * 6. return the resposne
 */
export const verifyEmail: RequestHandler = async (req, res) => {
  try {
    const { id, token } = req.body;
    const verifiedToken = await authToken.findOne({
      owner: id,
    });
    if (!verifiedToken) return toJson(null, 403, "Unauthorized Request!", res);

    const isMatched = await verifiedToken.compareToken(token);
    if (!isMatched)
      return toJson(null, 403, "Unauthorized Request, Invalid Token", res);

    await User.findByIdAndUpdate(id, { verified: true });

    await authToken.findByIdAndDelete(verifiedToken._id);
    toJson(
      { message: "Thanks for joining us. Your Email is verified." },
      200,
      null,
      res
    );
  } catch {
    toJson(null, 500, "Server Error", res);
  }
};

/**
 *  User Sign in
 * 1. get Email and password from user
 * 2. find a user with email in database
 * 3. if no user, return error
 * 4. create a jwt token  for that user and return the response back to the user
 * @returns
 */
export const signIn: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return toJson(null, 403, "Invalid Credentials", res);

    if (!user.verified)
      return toJson(null, 401, "User's Email is not verified yet", res);

    const isMatched = await user.comparePassword(password);
    if (!isMatched) return toJson(null, 403, "Invalid Credentials", res);

    const payload = { id: user._id };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "30m",
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET!);

    if (!user.tokens) user.tokens = [refreshToken];
    else user.tokens.push(refreshToken);

    await user.save();

    // //create session data
    // const broswerInfo = req.headers?.["user-agent"];
    // const session = new Session({
    //   userId: user._id,
    //   broswerId: broswerInfo,
    //   authToken: accessToken,
    // });
    // await session.save();

    return toJson(
      {
        profile: {
          id: user._id,
          address: user.address,
          email: user.email,
          name: user.name,
          verified: user.verified,
          role: user.role,
          avatar: user.avatar,
          promotions: user.promotions,
        },
        tokens: {
          refresh: refreshToken,
          accessToken,
        },
      },
      200,
      null,
      res
    );
  } catch (e) {
    toJson(null, 500, "Server Error", res);
  }
};

/**
 *  Regenerate a verification link
 * this one is optional to regenerate a verification link
 */
export const generateVerificationLink: RequestHandler = async (req, res) => {
  try {
    const { id, email } = req.user;

    const token = crypto.randomBytes(36).toString("hex");
    await authToken.findOneAndDelete({ owner: id });
    await authToken.create({ owner: id, token });

    const link = `https://bitesy.drazcoding.com/verify-user?id=${id}&token=${token}`;

    //verify email
    await SendEmail(
      email,
      "verification@bitesy.com",
      `<h1>Please click on <a href="${link}">this link</a> to verify your account</h1>`
    );

    toJson(
      { message: "We have sent verification to your email. Please verify it." },
      200,
      null,
      res
    );
  } catch {
    toJson(null, 500, "Server Error", res);
  }
};

/**
 * Refresh token with refrehtoken
 * 1. get the refreshtoken from body
 * 2. verify the refresh token
 * 3. check if user is legit from jwt payload
 * 4. create a new refresh token
 */
export const refreshToken: RequestHandler = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return toJson(null, 401, "Unauthorized Request!", res);

    const payload = jwt.verify(refreshToken, process.env.JWT_SECRET!) as {
      id: string;
    };
    if (payload.id) {
      const user = await User.findOne({
        _id: payload.id,
        tokens: refreshToken,
      });

      if (!user) {
        // user is compromised and removed all the previous tokens
        await User.findByIdAndUpdate(payload.id, { tokens: [] });
        return toJson(null, 401, "Unauthorized Request!", res);
      }

      const newAccessToken = jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: "15m",
      });

      const newRefreshToken = jwt.sign(payload, process.env.JWT_SECRET!);

      user.tokens = user.tokens.filter((t) => t !== refreshToken);
      user.tokens.push(newRefreshToken);
      await user.save();

      toJson(
        {
          tokens: { refresh: newRefreshToken, access: newAccessToken },
        },
        200,
        null,
        res
      );
    }
  } catch {
    toJson(null, 500, "Server Error", res);
  }
};

/**
 * Sign out from session
 * 1. check if user is legit from jwt token
 * 2. clear the tokens from user object
 * 3. remove broswer session from database
 * 4. return response
 *
 */
export const SignOut: RequestHandler = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return toJson(null, 401, "Unauthorized Request!", res);

    user.tokens = [];
    await user.save();

    //to do
    //remove broswer sessions

    toJson(
      {
        message: "You have successfully Logout",
      },
      200,
      null,
      res
    );
  } catch (e) {
    toJson(null, 500, "Server Error", res);
  }
};

/**
 * Send email to reset password
 * 1. get email from body
 * 2. check user with that email and check if it is legit
 * 3. create a temp token and create link
 * 4. send an email
 * 5. return response
 */
export const generateForgetPassLink: RequestHandler = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return toJson(null, 404, "Account Not Found", res);

    //remove token if existed
    await PasswordResetTokenModel.findOneAndDelete({ owner: user._id });

    const token = crypto.randomBytes(36).toString("hex");
    await PasswordResetTokenModel.create({ owner: user._id, token });

    const passResetLink = `${process.env.PASSWORD_RESET_LINK}?id=${user._id}&token=${token}`;

    await SendEmail(
      user.email,
      "support@bitesy.com",
      `<h1>Please click on <a href="${passResetLink}">this link</a> to reset your password</h1>`
    );

    toJson(
      {
        message: "Please check your email to reset your password",
      },
      200,
      null,
      res
    );
  } catch {
    toJson(null, 500, "Server Error", res);
  }
};

/**
 *  Reset Password
 * 1. find user  with id  from req body;
 * 2. check new password is different with old password
 * 3. save the new password
 * 4. delete the temp token from database
 * 5. return the response
 */
export const resetPassword: RequestHandler = async (req, res) => {
  try {
    const { id, password } = req.body;
    const user = await User.findById(id);
    if (!user) return toJson(null, 403, "Unauthorized Access!", res);

    const matched = await user.comparePassword(password);
    if (matched)
      return toJson(null, 422, "New Password must be different!", res);

    user.password = password;
    await user.save();

    await PasswordResetTokenModel.findOneAndDelete({ owner: user._id });

    toJson(
      {
        message: "Your password is updated",
      },
      200,
      null,
      res
    );
  } catch (error) {
    toJson(null, 500, "Server Error", res);
  }
};
