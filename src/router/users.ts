import express from "express";

import { getAllUsers } from "../controllers/users";
import { isAuthenticated } from "../middlewares";

export default (router: express.Router) => {
  // isAuthenticated checks for the session token
  router.get("/users", isAuthenticated, getAllUsers);
};
