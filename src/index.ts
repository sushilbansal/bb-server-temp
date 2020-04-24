import { ApolloError, ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import Express from 'express';
import session from 'express-session';
import { GraphQLError } from 'graphql';
import http from 'http';
import { getConnection } from 'typeorm';
import { v4 } from 'uuid';

import { COOKIE_PREFIX } from './common/constants';
import { redis } from './redis';
import { UserLoader } from './server/dataloader';
import { REDIS_SESSION_PREFIX } from './server/util/constants';
import { createSchema } from './server/util/createSchema';
import { createTypeORMConn } from './server/util/createTypeORMConn';
import { DisplayError } from './server/util/server/DisplayError';
import { logManager } from './server/util/server/logManager';
// import { queryComplexityPlugin } from './server/util/server/QueryComplexity';
import { setupErrorHandling } from './server/util/server/shutdown';

// import qs from 'qs';

const logger = logManager();
const main = async () => {
  const NODE_ENV = process.env.NODE_ENV;

  if (NODE_ENV === "test") {
    await redis.flushall();
  }

  try {
    const conn = await createTypeORMConn();
    conn.runMigrations();
    const schema = await createSchema();

    const apolloServer = new ApolloServer({
      subscriptions: {
        path: "/",
      },
      schema,
      context: ({ req, res }) => ({
        req,
        res,
        session: req ? req.session : undefined,
        redis,
        url: req ? req.protocol + "://" + req.get("host") : "",
        userLoader: UserLoader(),
      }),
      // plugins: [queryComplexityPlugin(schema)],
      playground: {
        endpoint: `/graphql`,
      },
      introspection: true,
      formatError: (error: GraphQLError) => {
        if (
          error.originalError instanceof ApolloError ||
          error.originalError instanceof DisplayError
        ) {
          return error;
        }

        const errId = v4();
        console.log("errId: ", errId);
        console.log(error);

        return new GraphQLError(`Internal Error: ${errId}`);
      },
    });
    const app = Express();
    const RedisStore = connectRedis(session);
    if (NODE_ENV === "production") {
      app.set("trust proxy", 1);
    }

    app.use(
      session({
        store: new RedisStore({
          client: redis as any,
          prefix: REDIS_SESSION_PREFIX,
        }),
        name: COOKIE_PREFIX,
        secret: "aslkdfjoiq12312",
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          secure: NODE_ENV === "production",
          maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
          sameSite: true,
          path: "/",
        },
        proxy: true,
      })
    );

    let origin: any = ["http://localhost:3000"];
    if (NODE_ENV === "production") {
      origin = [
        "https://bakbakapp.com",
        "https://bakbakapp.com/",
        "https://www.bakbakapp.com",
        "https://www.bakbakapp.com/",
      ];
    } else if (NODE_ENV === "test") {
      origin = "*";
    }
    app.use(
      cors({
        credentials: true,
        origin,
      })
    );

    apolloServer.applyMiddleware({ app, cors: false, path: "/" });
    const httpServer = http.createServer(app);
    apolloServer.installSubscriptionHandlers(httpServer);

    const serverPort = process.env.PORT || process.env.EXPRESS_SERVER_PORT;
    const port =
      NODE_ENV === "test" ? process.env.TEST_SERVER_PORT : serverPort;

    const nodeServer = httpServer.listen(port, () => {
      console.log(`****** server started on ${port}`);
      console.log(
        `🚀 Subscriptions ready at ${port}${apolloServer.subscriptionsPath}`
      );
    });

    setupErrorHandling({
      db: getConnection(),
      redisClient: redis,
      logger: logger,
      nodeServer: nodeServer,
    });
  } catch (e) {
    console.log(" <<<<> >>>> Error ---- ", e);
  }
};

main();
