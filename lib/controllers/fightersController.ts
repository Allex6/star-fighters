import fightersService from './../services/fightersService';
import { Request, Response, NextFunction } from 'express';

async function list(req: Request, res: Response, next: NextFunction){

    const fighters = await fightersService.list();
    res.send(fighters);

}

export default {
    list
}