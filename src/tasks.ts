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

tasksRoute.put("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return c.json({ error: `Task ${id} not found` }, 404);
  }

  let body;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: "invalid body" }, 400);
  }

  if (body.title === undefined && body.done === undefined) {
    return c.json({ error: "title or done is required" }, 400);
  }

  if (body.title !== undefined) task.title = body.title;
  if (body.done !== undefined) task.done = body.done;

  return c.json(task);
});

tasksRoute.delete("/:id", (c) => {
  const id = Number(c.req.param("id"));
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return c.json({ error: `Task ${id} not found` }, 404);
  }

  tasks.splice(index, 1);

  return c.body(null, 204);
});

export { tasksRoute };
