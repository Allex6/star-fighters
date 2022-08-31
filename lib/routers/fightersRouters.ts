import { Router } from "express";
import fightersController from "../controllers/fightersController";

const router = Router();

router.get('/ranking', 
    fightersController.list
);

export default router;