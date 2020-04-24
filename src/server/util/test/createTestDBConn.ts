import { createConnection, getConnectionOptions } from "typeorm";

export const createTestDBConn = async (resetDB: boolean = false) => {
  const connectionOptions = await getConnectionOptions("test");
  return createConnection({
    ...connectionOptions,
    name: "default",
    synchronize: resetDB,
    dropSchema: resetDB
  });
};


export class CreateTestDBConn {
  static instance: any = null;
  static count = 0;

  static async getInstance() {
    if (CreateTestDBConn.instance === null) {
      CreateTestDBConn.instance = async (resetDB: boolean = false) => {
        const connectionOptions = await getConnectionOptions(
          process.env.NODE_ENV
        );
        return createConnection({
          ...connectionOptions,
          name: "default",
          synchronize: resetDB,
          dropSchema: resetDB
        });
      };
    }
    return this.instance;
  }
}