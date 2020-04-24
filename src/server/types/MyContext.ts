import { Request, Response } from 'express';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Redis } from 'ioredis';

import { UserLoader } from '../dataloader';

export interface LocalSession extends Express.Session {
  userId: string;
}
export interface MyContext {
  req: Request;
  res: Response;
  session: LocalSession;
  url: string;
  pubsub: RedisPubSub;
  redis: Redis;
  userLoader: ReturnType<typeof UserLoader>;
}
