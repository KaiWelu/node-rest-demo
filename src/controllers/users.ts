// this is the controller for users
import express from "express";

import { deleteUserById, getUserById, getUsers } from "../db/users";

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { username } = req.body;
    const { id } = req.params;

    if (!username) {
      console.log("400 - no username!");
      return res.sendStatus(400);
    }

    const user = await getUserById(id);
    user.username = username;
    await user.save();

    console.log("200 - username updated!");
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();

    console.log("200 - get users was successful!");
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserById(id);

    console.log("200 - deletion successful!");

    return res.json(deletedUser);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
