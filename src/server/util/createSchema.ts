import { RedisPubSub } from 'graphql-redis-subscriptions';
import { buildSchema } from 'type-graphql';

const NODE_ENV = process.env.NODE_ENV;

const pubSub = new RedisPubSub(
  NODE_ENV === "production" ? { connection: process.env.REDIS_URL as any } : {}
);

export const createSchema = async () =>
  await buildSchema({
    resolvers: [__dirname + "/../modules/**/*.resolver.{ts,js}"],
    pubSub,
  });
