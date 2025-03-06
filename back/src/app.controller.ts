import { Controller, Get } from "@nestjs/common";
import { data } from "../data/data";
import { UserFlow } from "../../shared/types";

@Controller()
export class AppController {
  @Get("data")
  getData(): UserFlow[] {
    return data.map((d) => new UserFlow(d as UserFlow));
  }
}
