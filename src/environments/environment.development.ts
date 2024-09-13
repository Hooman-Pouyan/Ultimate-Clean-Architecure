import { environment as commonEnv } from "./environment.common";

export const environment = {
  ...commonEnv,
  rest: {
    url: "http://Clean-arch.ddns.net:3000/api/v1",
  },
};
