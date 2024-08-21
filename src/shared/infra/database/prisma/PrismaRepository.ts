import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaRepository extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: [
        {
          emit: "event",
          level: "query",
        },
        {
          emit: "stdout",
          level: "error",
        },
        {
          emit: "stdout",
          level: "info",
        },
        {
          emit: "stdout",
          level: "warn",
        },
      ],
    });
  }

  async onModuleInit() {
    await this.$connect();
    if (process.env.NODE_ENV == "development") {
      //@ts-ignore testing

      this.$on("query", (e) => {
        //@ts-ignore testing
        console.log("Query: " + e.query);
        //@ts-ignore testing
        console.log("Params: " + e.params);
        //@ts-ignore testing
        console.log("Duration: " + e.duration + "ms");
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
async enableShutdownHooks(app: INestApplication) {
  process.on('beforeExit', () => {
    app.close();
  });
}
}
