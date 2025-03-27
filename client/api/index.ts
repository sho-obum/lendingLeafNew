import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware to log API requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

registerRoutes(app);

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message || "Internal Server Error" });
});

const port = process.env.PORT || 3001; // For local testing
app.listen(port, () => console.log(`API running on port ${port}`));

export default app;
