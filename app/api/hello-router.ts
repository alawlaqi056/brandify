import { createRouter, publicQuery } from "./middleware";

export const helloRouter = createRouter({
  hello: publicQuery.query(() => "Hello from Brandify API"),
});
