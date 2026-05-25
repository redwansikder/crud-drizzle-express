import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import healthRoute from "./routes/health.route.js";
import usersRoute from "./routes/users.route.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

app.use(express.json());

app.use("/health", healthRoute);
app.use("/users", usersRoute);

export default app;
