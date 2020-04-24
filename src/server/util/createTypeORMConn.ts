import { createConnection, getConnectionOptions } from "typeorm";

export const createTypeORMConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  if (process.env.NODE_ENV === "production") {
    return createConnection({
      ...connectionOptions,
      url: process.env.DATABASE_URL,
      name: "default"
    } as any);
  } else {
    return createConnection({
      ...connectionOptions,
      name: "default"
    });
  }
};
