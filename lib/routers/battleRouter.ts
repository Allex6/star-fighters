import { Router } from "express";
import battleController from "../controllers/battleController";
import schemaValidator from "../middlewares/schemaValidator";
import battleSchema from "../schemas/battleSchema";

const router = Router();

router.post('/', 
    schemaValidator(battleSchema), 
    battleController.createBattle
);

export default router;