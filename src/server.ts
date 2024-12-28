import sequelize from "./models";
import express from 'express';
import bodyParser from "body-parser";
import userRoutes from './routes/UserRoutes';
import { errorHandler } from "./middleware/errorHandler";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/users", userRoutes);
app.use(errorHandler);

sequelize.sync({ force: true }).then(() => {
  app
    .listen(PORT)
    .on("listening", () => console.log(`Server running at http://localhost:${PORT}`));
});

export default app;