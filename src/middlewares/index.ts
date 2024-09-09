import express from "express";
// A modern JavaScript utility library delivering modularity, performance & extras. https://lodash.com/
import { get, merge } from "lodash";

import { getUserBySessionToken } from "../db/users";
