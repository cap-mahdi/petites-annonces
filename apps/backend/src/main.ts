/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from "express";
import * as path from "path";
import type { User, ApiResponse } from "@my-app/types";
import { validateUser } from "@my-app/schema";

const app = express();

app.use("/assets", express.static(path.join(__dirname, "assets")));

app.get("/api", (req, res) => {
  res.send({ message: "Welcome to backend!" });
});

app.get("/api/user", (req, res) => {
  const user: User = {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
  };

  const isValid = validateUser(user);

  const response: ApiResponse<User> = {
    success: isValid,
    data: user,
    message: isValid ? "User is valid" : "User is invalid",
  };

  res.json(response);
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on("error", console.error);
