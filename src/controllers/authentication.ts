// this is a controller for registering users

import express from "express";
import { createUser, getUserByEmail } from "../db/users";
import { authentication, random } from "../helpers";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    // checks if any fields are missing
    if (!email || !password || !username) {
      return res.sendStatus(400);
    }

    // checks if user exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
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

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    // this is how you respond with a status
    return res.sendStatus(400);
  }
};
