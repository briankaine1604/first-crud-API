// tasks.ts
import { Hono } from "hono";

type Task = {
  id: number;
  title: string;
  done: boolean;
};

const tasks: Task[] = [
  { id: 1, title: "Learn Hono routing", done: true },
  { id: 2, title: "Build the tasks endpoint", done: false },
  { id: 3, title: "Ship Stage 1", done: false },
];

const tasksRoute = new Hono();

tasksRoute.get("/", (c) => {
  return c.json(tasks);
});

tasksRoute.get("/:id", (c) => {
  const id = Number(c.req.param("id"));
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return c.json({ error: `Task ${id} not found` }, 404);
  }

  return c.json(task);
});

tasksRoute.post("/", async (c) => {
  const body = await c.req.json();

  if (!body.title) {
    return c.json({ error: "title is required" }, 400);
  }

  const newTask: Task = {
    id: tasks.length + 1,
    title: body.title,
    done: false,
  };

  tasks.push(newTask);

  return c.json(newTask, 201);
});

export { tasksRoute };
