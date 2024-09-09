import express from "express";
// A modern JavaScript utility library delivering modularity, performance & extras. https://lodash.com/
import { get, identity, merge } from "lodash";

import { getUserBySessionToken } from "../db/users";

export const isAuthenticaded = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    // gets the session token
    const sessionToken = req.cookies["NODE-DEMO"];

    if (!sessionToken) {
      console.log("403 - no token!");
      return res.sendStatus(403);
    }

    //check if the user exists
    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) {
      console.log("403 - no user known!");
      return res.sendStatus(403);
    }

    // not completely shure why we need that
    merge(req, { identity: existingUser });

    // for reference https://stackoverflow.com/questions/13133071/express-next-function-what-is-it-really-for
    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
