import express, { Router } from "express";

import { dbSeed } from "@/db/db-seed";

const dbRouter: Router = express.Router();

dbRouter.post("/db-seed", dbSeed);

export default dbRouter;
