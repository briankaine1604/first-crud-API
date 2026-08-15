// index.ts
import { Hono } from "hono";
import { health } from "./health";
import { tasksRoute } from "./tasks";

const app = new Hono();

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
