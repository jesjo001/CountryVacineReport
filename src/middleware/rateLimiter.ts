import { RateLimiterMemory } from "rate-limiter-flexible";
import {Request, Response} from 'express';


  const opts = {
      points: 2, // 2 points
      duration: 60, // Per Minutes
  };

  const rateLimiter = new RateLimiterMemory(opts);

  const rateLimiterMiddleware = (req: Request , res: Response, next: any) => {
    const userToken = req.body.token;

    // Consume 1 point for each action
    rateLimiter.consume(userToken, 1) // or req.ip, This also works for ip in case token does not exist
    .then(() => {
      next();
    })
    .catch((rejRes) => {
      res.status(429).send(`Too Many Retrys Per minute.`);
    });
  };

export default rateLimiterMiddleware;