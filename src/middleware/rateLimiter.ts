import { RateLimiterMemory } from "rate-limiter-flexible";
import {Request, Response} from 'express';
const opts = {
    points: 5, // 6 points
    duration: 60, // Per second
  };
  

  const rateLimiter = new RateLimiterMemory(opts);

  const rateLimiterMiddleware = (req: Request , res: Response, next: any) => {
    const userToken = req.body.token;
    // Consume 1 point for each action
    // This
  
    rateLimiter.consume(userToken) // or req.ip
    .then(() => {
      next();
    })
    .catch((rejRes) => {
      res.status(429).send(`Too Many Retrys Per minute.`);
    });
  };

export default rateLimiterMiddleware