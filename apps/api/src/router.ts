import { toNodeHandler } from "better-auth/node";
import express, { type Router } from "express";
import { auth } from "./lib/auth";

const router: Router = express.Router();

// ************************************************** //
//Define your API Routes Here

router.all("/auth/*splat", toNodeHandler(auth));

// ************************************************** //

export default router;
