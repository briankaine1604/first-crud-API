// index.ts
import { Hono } from "hono";
import { health } from "./health";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    name: "Task API",
    version: "1.0",
    endpoints: ["/tasks"],
  });
});

app.route("/health", health);

export default app;
