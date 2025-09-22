import { Server } from "http";
import express from "express";

export function buildTestServer() {
  const app = express();
  const server = new Server(app);

  return server;
}
