import battleService from './../services/battleService';
import { Request, Response, NextFunction } from 'express';
    
async function createBattle(req: Request, res: Response, next: NextFunction){

    const bodyData = req.body;
    const result = await battleService.createBattle(bodyData);
    res.send(result);

}

export default {
    createBattle
}