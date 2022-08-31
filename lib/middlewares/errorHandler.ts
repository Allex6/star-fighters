import { Request, Response, NextFunction } from 'express';

function errorHandler(error: any, req: Request, res: Response, next: NextFunction){

    console.log('error ', error);

    if(error.type === 'not_found') res.status(404).send(error.message);
    if(error.type === 'conflict') res.status(422).send(error.message);

    return res.sendStatus(500);

};

export default errorHandler;