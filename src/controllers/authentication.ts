// this is a controller for registering users

import express from "express";
import { createUser, getUserByEmail } from "../db/users";
import { authentication, random } from "../helpers";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    // extract expected fields from request
    const { email, password } = req.body;

    if (!email || !password) {
      console.log("400 - password or email is missing");
      return res.sendStatus(400);
    }

    //check for an existing user
    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      console.log("400 - no user found");
      return res.sendStatus(400);
    }

    // authenticate user without knowing their password by using hash comparison
    const expectedHash = authentication(user.authentication.salt, password);

    // check the hash of the request with the one in the database for the user
    if (user.authentication.password !== expectedHash) {
      console.log("403 - access forbidden");
      return res.sendStatus(403);
    }

    // creates a user session token and updates the user model object
    // see https://mongoosejs.com/docs/documents.html for reference
    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );
    await user.save();

    // this  will set a cookie with the session token
    res.cookie("NODE-DEMO", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });

    // return status and user and end the stream
    console.log("200 - successful login");
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    console.log("400 - bad login request");
    return res.sendStatus(400);
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    // checks if any fields are missing
    if (!email || !password || !username) {
      console.log("400 bad request - missing data!");
      return res.sendStatus(400);
    }

    // checks if user exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      console.log("400 bad request - user already exists!");
      return res.sendStatus(400);
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });
    console.log("200 - user registered!");
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    // this is how you respond with a status
    return res.sendStatus(400);
  }
};
