import { createTestDBConn } from "./createTestDBConn";

createTestDBConn(true).then(() => process.exit());