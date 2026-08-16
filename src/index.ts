// index.ts
import { Hono } from "hono";
import { health } from "./health";
import { tasksRoute } from "./tasks";
import { swaggerUI } from "@hono/swagger-ui";
import openapiDoc from "../openapi.json";

const app = new Hono();

app.get("/docs", swaggerUI({ url: "/openapi.json" }));
app.get("/openapi.json", (c) => c.json(openapiDoc));

app.get("/", (c) => {
  return c.json({
    name: "Task API",
    version: "1.0",
    endpoints: ["/tasks"],
  });
});

app.route("/health", health);
app.route("/tasks", tasksRoute);

export default app;
