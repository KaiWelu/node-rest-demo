import express from "express";

import { deleteUser, getAllUsers } from "../controllers/users";
import { isAuthenticated } from "../middlewares";

export default (router: express.Router) => {
  // isAuthenticated checks for the session token
  router.get("/users", isAuthenticated, getAllUsers);
  router.delete("/users/:id", deleteUser);
};
