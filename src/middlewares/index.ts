import express from "express";
// A modern JavaScript utility library delivering modularity, performance & extras. https://lodash.com/
import { get, merge } from "lodash";

import { getUserBySessionToken } from "../db/users";

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    // we need "as string" because we merged identy in the isAuthenticated function
    const currentUserId = get(req, "identity._id") as string;

    //check for user id
    if (!currentUserId) {
      console.log("403 - no id found!");
      return res.sendStatus(403);
    }

    if (currentUserId.toString() !== id) {
      console.log("403 - wrong user!");
      return res.sendStatus(403);
    }
    next();
  } catch (error) {
    console.log(error);
    console.log("403 - not owner!");
    return res.sendStatus(403);
  }
};

export const isAuthenticated = async (
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
